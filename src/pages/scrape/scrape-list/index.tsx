import type { FC} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Divider,
  Drawer,
  Image,
  message,
  Modal,
  Pagination,
  Space,
  Tag,
} from 'antd';
import {
  CloudUploadOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import type { ScrapeItem } from './data.d';
import { findDOMNode } from 'react-dom';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ScrapeModal from '@/pages/scrape/scrape-list/components/ScrapeModal';
import {
  addScrape,
  updateScrape,
  uploadScrape,
  uploadScrapes,startScrape,stopScrape,
} from '@/pages/scrape/scrape-list/service';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment';

interface BasicListProps {
  listAndScrapeList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

// const Info: FC<{
//   title: React.ReactNode;
//   value: React.ReactNode;
//   bordered?: boolean;
// }> = ({ title, value, bordered }) => (
//   <div className={styles.headerInfo}>
//     <span>{title}</span>
//     <p>{value}</p>
//     {bordered && <em />}
//   </div>
// );

/**
 *  批量上传
 * @param selectedRows
 */
const handleUpload = async (selectedRows: ScrapeItem[]) => {
  const hide = message.loading('正在上传');
  if (!selectedRows) return true;
  const resp = await uploadScrapes(selectedRows.map((row) => row.name));
  hide();
  if (resp.status === 'success') {
    message.success(resp.message);
    return true;
  }
  message.error('上传失败，请重试');
  return false;
};

export const ScrapeList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    dispatch,
    listAndScrapeList: { itemList },
  } = props;

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [polling, setPolling] = useState<number | undefined>(1000);
  const [scraping, setScraping] = useState<number | undefined>();
  const [scrapeDone, setScrapeDone] = useState<boolean>(false);
  const [scrapeVisible, setScrapeVisible] = useState<boolean>(false);
  const [scrapeCurrent, setScrapeCurrent] = useState<Partial<ScrapeItem> | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<ScrapeItem>();
  const [selectedRowsState, setSelectedRows] = useState<ScrapeItem[]>([]);

  const showEditModal = (item: ScrapeItem) => {
    const newItem = { ...item };
    if (item.id) {
      setScrapeVisible(true);
      setScrapeCurrent(newItem);
    }
  };

  const uploadScrapeCall = async (values: ScrapeItem) => {
    return await uploadScrape(values);
  };

  const startScrapeCall = async () => {
    return  startScrape();
  };

  const stopScrapeCall = async () => {
    return  stopScrape();
  };

  const columns: ProColumns<ScrapeItem>[] = [
    {
      title: '缩略图',
      valueType: 'image',
      dataIndex: 'thumb_path',
      hideInDescriptions: true,
      search: false,
      render: (dom, entity) => {
        return (
          <Image
            width="72px"
            src={`/api/v0/resource/${entity.name}/image/thumb.jpg?ts=1`}
            crossOrigin="anonymous"
            fallback="/admin/failed/147x200.svg"
            // preview={{
            //   src: 'http://localhost:9033/api/v0/resource/failed/147x200.svg',
            // }}
          />

        );
      },
    },
    {
      title: '番号',
      dataIndex: 'name',
      tip: '番号是唯一Key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '抓取状态',
      dataIndex: 'need_scrape',
      valueEnum: {
        true: { text: '等待中', status: 'Processing' },
        false: { text: '已完成', status: 'Success' },
      },
    },
    {
      title: '媒体索引',
      dataIndex: 'index',
      hideInForm: true,
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '资源检测',
      dataIndex: 'check_state',
      hideInForm: true,
      hideInSearch:true,
      // valueType: 'radioButton',
      valueEnum: {
        not_run: { text: '未检测', status: 'Default' },
        media_failed: { text: '媒体异常', status: 'Error' },
        thumb_failed: { text: '缩略图异常', status: 'Error' },
        poster_failed: { text: '海报异常', status: 'Error' },
        info_failed: { text: '信息异常', status: 'Error' },
        other_failed: { text: '其他错误', status: 'Error' },
        success: { text: '通过', status: 'Success' },
      },
    },
    {
      title: '媒体状态',
      dataIndex: 'media_exist',
      hideInTable: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>
          <Tag color={record.media_exist ? 'green' : 'red'} key={'media_exist'}>
            {record.media_exist ? '有效' : '无效'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '媒体路径',
      dataIndex: 'media_path',
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '海报状态',
      dataIndex: 'poster_exist',
      hideInTable: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>
          <Tag color={record.poster_exist ? 'green' : 'red'} key={'poster_exist'}>
            {record.poster_exist ? '有效' : '无效'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '海报路径',
      dataIndex: 'poster_path',
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '缩略图状态',
      dataIndex: 'thumb_exist',
      hideInTable: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>
          <Tag color={record.thumb_exist ? 'green' : 'red'} key={'thumb_exist'}>
            {record.thumb_exist ? '有效' : '无效'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '缩略图路径',
      dataIndex: 'thumb_path',
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '信息状态',
      dataIndex: 'thumb_exist',
      hideInTable: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>
          <Tag
            color={record.content_id !== '00000000-0000-0000-0000-000000000000' ? 'green' : 'red'}
            key={'content_id'}
          >
            {record.content_id !== '00000000-0000-0000-0000-000000000000' ? '有效' : '无效'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '信息来源',
      dataIndex: 'thumb_exist',
      hideInTable: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>
          {
            record.edges.contents?.filter((value) => {
              if (value.id === record.content_id) {
                return true;
              }
              return false;
            })[0]?.from
          }
        </Space>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_unix',
      // sorter: true,
      valueType: 'date',
      hideInForm: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>{moment.unix(record.updated_unix).format('YYYY-MM-DD HH:mm:ss')}</Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_unix',
      sorter: true,
      valueType: 'date',
      hideInTable: true,
      hideInForm: true,
      hideInSearch:true,
      render: (_, record) => (
        <Space>{moment.unix(record.updated_unix).format('YYYY-MM-DD HH:mm:ss')}</Space>
      ),
    },
    {
      title: '强制执行',
      dataIndex: 'force',
      hideInTable: true,
      hideInSearch:true,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          <Tag color={record.force ? 'red' : 'green'} key={'force'}>
            {record.force ? '是' : '否'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '上传状态',
      dataIndex: 'upload_state',
      hideInForm: true,
      hideInSearch:true,
      valueEnum: {
        not_run: { text: '没有任务', status: 'Default' },
        waiting: { text: '等待上传', status: 'Processing' },
        file: { text: '上传中', status: 'Processing' },
        info: { text: '上传中', status: 'Processing' },
        success: { text: '上传完毕', status: 'Success' },
        failed: { text: '上传失败', status: 'Error' },
        file_failed: { text: '文件异常', status: 'Error' },
      },
    },
    {
      title: '上传ID',
      dataIndex: 'upload_id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '上传Hash',
      dataIndex: 'upload_hash',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '上传',
      dataIndex: 'upload',
      hideInTable: true,
      render: (_, record) => (
        <Button
          type="primary"
          size={'small'}
          icon={<CloudUploadOutlined />}
          disabled={!'|not_run|file_failed|info_failed|failed|'.includes(record.upload_state)}
          key="upload"
          onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              icon: <ExclamationCircleOutlined />,
              content: `是否上传${record.name}`,
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                uploadScrapeCall(record).then((resp) => {
                  if (resp.status === 'success') {
                    Modal.success({
                      okText: '朕已阅',
                      content: resp.message,
                    });
                  } else {
                    Modal.error({
                      okText: '朕已阅',
                      content: resp.message,
                    });
                  }
                });
              },
            });
          }}
        >
          {' '}
          上传{' '}
        </Button>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      hideInDescriptions: true,
      render: (_, record) => (
        <>
          <a
            key="edit"
            onClick={() => {
              showEditModal(record);
            }}
          >
            {' '}
            编辑{' '}
          </a>

          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'listAndScrapeList/fetch',
      payload: {
        page,
        per_page: perPage,
      },
    });
  }, [page, perPage]);

  const showModal = () => {
    setScrapeVisible(true);
    setScrapeCurrent(undefined);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 300);
    }
  };

  const handleScrapeDone = () => {
    setAddBtnblur();
    setScrapeDone(false);
    setScrapeVisible(false);
  };

  const handleScrapeCancel = () => {
    setAddBtnblur();
    setScrapeVisible(false);
  };

  const handleScrapeSubmit = async (values: ScrapeItem) => {
    setAddBtnblur();
    let callback;
    if (values.id) {
      callback = updateScrape;
    } else {
      callback = addScrape;
    }
    const resp = await callback(values);
    if (resp.status === 'success') {
      Modal.success({
        content: resp.message,
        onOk: () => {
          setScrapeVisible(false);
        },
      });
      dispatch({
        type: 'listAndScrapeList/fetch',
        payload: {
          page,
          per_page: perPage,
        },
      });
    } else {
      Modal.error({
        content: resp.message,
        onOk: () => {
          setScrapeVisible(false);
        },
      });
    }
  };

  const onChange = (newPage: number, pageSize?: number) => {
    console.log('ScrapeList|onChange', newPage, pageSize);
    setPerPage(pageSize === undefined ? 15 : pageSize);
    setPage(newPage);
  };

  const footer = [
    <Pagination
      total={itemList?.total}
      current={itemList?.current_page}
      onChange={onChange}
      defaultPageSize={perPage}
      pageSizeOptions={['15', '35', '55', '75', '95']}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
    />,
  ];

  return (
    <div>
      <PageContainer footer={footer}>
        <ProTable<ScrapeItem>
          headerTitle="查询表格"
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          dataSource={itemList == null ? [] : itemList.data}
          pagination={false}
          polling={polling || undefined}
          toolBarRender={() => [
            <Button
              key="4"
              type="primary"
              onClick={() => {
                if (scraping) {
                  setScraping(undefined);
                  stopScrapeCall()
                  return;
                }

                setScraping(1000);
                startScrapeCall()




              }}
            >
              {scraping ? <LoadingOutlined /> : <ReloadOutlined />}
              {scraping ? '停止爬虫' : '启动爬虫'}
            </Button>,
            <Button
              key="3"
              type="primary"
              onClick={() => {
                if (polling) {
                  setPolling(undefined);
                  return;
                }
                setPolling(1000);
              }}
            >
              {polling ? <LoadingOutlined /> : <ReloadOutlined />}
              {polling ? '停止轮询' : '开始轮询'}
            </Button>,
            <Button type="primary" onClick={() => showModal()}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={async () => {
            dispatch({
              type: 'listAndScrapeList/fetch',
              payload: {
                page,
                per_page: perPage,
              },
            });
            return Promise.resolve({
              success: true,
            });
          }}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
        />

      </PageContainer>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <span>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleUpload(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量上传
          </Button>

        </FooterToolbar>
      )}
      <ScrapeModal
        done={scrapeDone}
        current={scrapeCurrent}
        visible={scrapeVisible}
        onDone={handleScrapeDone}
        onCancel={handleScrapeCancel}
        onSubmit={handleScrapeSubmit}
      />

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <>
            <Image
              width="100%"
              src={`/api/v0/resource/${row.name}/image/poster.jpg?ts=${Math.round(
                Date.now() / 10000,
              )}`}
              fallback="/admin/failed/800x540.svg"
            />
            <ProDescriptions<ScrapeItem>
              column={2}
              title={row.name}
              request={async () => ({
                data: row || {},
              })}
              params={{
                id: row.name,
              }}
              columns={columns}
            />
          </>
        )}
      </Drawer>
    </div>
  );
};

export default connect(
  ({
    listAndScrapeList,
    loading,
  }: {
    listAndScrapeList: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    listAndScrapeList,
    loading: loading.models.listAndScrapeList,
  }),
)(ScrapeList);
