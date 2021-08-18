
import {  message,  Drawer, Image} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateRule, addRule, removeRule, queryTopList, updateTopList} from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateTopList({
      information_id: fields.id,
      title: fields.title,
      intro: fields.intro,
      lower_banner: fields.lower_banner,
      top_right: fields.top_right,
      category: fields.category,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

function cateroryTrans (catetoryList){
  return catetoryList.toString()
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '缩略图',
      valueType: 'image',
      dataIndex: 'thumb_path',
      hideInDescriptions: true,
      search: false,
      render: (dom, entity) => {
        return (
          // <Image
          //   width="72px"
          //   src={`/api/v0/resource/${entity.video_no}/image/thumb.jpg?ts=${Math.round(
          //     Date.now() / 10000,
          //   )}`}
          //   fallback="/admin/failed/147x200.svg"
          //   // preview={{
          //   //   src: 'http://localhost:9033/api/v0/resource/failed/147x200.svg',
          //   // }}
          // />
        <Image
          width="250px"
          src={localStorage.getItem("InformationImgUrl") + entity.root + '/' + entity.poster_path + "?ts=1"}
          fallback="/admin/failed/147x200.svg"
          crossOrigin="anonymous"
        />
        );
      },
    },
    {
      title: '视频番号',
      dataIndex: 'video_no',
      tip: '视频番号是唯一的',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: 'root',
      dataIndex: 'root',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'poster_path',
      dataIndex: 'poster_path',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'textarea',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '介绍',
      dataIndex: 'intro',
      sorter: false,
      hideInForm: true,
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '分类',
      dataIndex: 'category',
      sorter: false,
      hideInForm: true,
      hideInSearch: false,
      hideInTable: true,
      valueType: 'textarea',
      valueEnum: {
        'newest': { text: '最新上架', status: 'newest' },
        'hottest': { text: '人气最高', status: 'hottest' },
        'star': { text: '明星', status: 'star' },
        'producer': { text: '制作公司', status: 'producer' },
        'exclusive': { text: '独家内容', status: 'exclusive' },
        'top': { text: '置顶', status: 'top' },
        'special': { text: '推荐', status: 'special' },
        'normal': { text: '正常', status: 'normal' },


      },
    },
    {
      title: '分类',
      dataIndex: 'category',
      sorter: false,
      hideInForm: true,
      hideInSearch: true,
      valueType: 'textarea',
      render: (text,record,index) => cateroryTrans(text),
    },
    {
      title: '下角标',
      dataIndex: 'lower_banner',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        'free': { text: '免费', status: 'free' },
        'discount': { text: '折扣', status: 'discount' },
        'event': { text: '限免', status: 'event' },
        'premium': { text: '精品', status: 'premium' },
        'collection': { text: '收藏', status: 'collection' },
        'liked': { text: '喜欢', status: 'liked' },
        'none': { text: '无', status: 'none' },
      },
    },
    {
      title: '右上角标',
      dataIndex: 'top_right',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        'free': { text: '免费', status: 'free' },
        'discount': { text: '折扣', status: 'discount' },
        'event': { text: '限免', status: 'event' },
        'premium': { text: '精品', status: 'premium' },
        'collection': { text: '收藏', status: 'collection' },
        'liked': { text: '喜欢', status: 'liked' },
        'none': { text: '无', status: 'none' },
      },
    },
    // {
    //   title: '上次调度时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   valueType: 'dateTime',
    //   hideInForm: true,
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder="请输入异常原因！" />;
    //     }
    //     return defaultRender(item);
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="查询视频"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
        ]}
        request={(params, sorter, filter) => queryTopList({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;

            </div>
          }
        >

        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
