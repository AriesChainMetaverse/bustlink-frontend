import { DownOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Dropdown, Menu, message, Pagination } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import EditInfoForm from './components/EditInfoForm';
import type { InfoFormValueType } from './components/AddInfoForm';
import AddInfoForm from './components/AddInfoForm';
import type { ChannelItem } from './data.d';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import { addChannel, addChannelInfos, channelSyncTransferInfo, syncTransferChannelInfo } from '@/pages/channel/service';
import AddChannelForm, { ChannelFormValueType } from '@/pages/channel/components/AddChannelForm';

interface ChannelListProps {
  listAndChannelList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

/**
 * 添加媒体
 * @param fields
 */
const handleInfoAdd = async (fields: InfoFormValueType) => {
  const hide = message.loading('正在添加');

  const resp = await addChannelInfos({ ...fields });
  hide();
  if (resp.status === 'success') {
    message.success(resp.message);
    return true;
  }
  message.error(resp.message);
  return false;
};

/**
 * 编辑媒体
 * @param fields
 */
const handleInfoEdit = async (fields: InfoFormValueType) => {
  const hide = message.loading('正在添加');

  const resp = await addChannelInfos({ ...fields });
  hide();
  if (resp.status === 'success') {
    message.success(resp.message);
    return true;
  }
  message.error(resp.message);
  return false;
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleInfoRemove = async (selectedRows: ChannelItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // await removeRule({
    //   key: selectedRows.map((row) => row.key),
    // });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleChannelAdd = async (value: ChannelFormValueType) => {
  const hide = message.loading('正在添加');

  const resp = await addChannel(value);
  hide();
  if (resp.status === 'success') {
    message.success(resp.message);
    return true;
  }
  message.error(resp.message);
  return false;
};

const ChannelList: React.FC<ChannelListProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [editInfoModalVisible, handleEditInfoModalVisible] = useState<boolean>(false);
  const [addInfoModalVisible, handleAddInfoModalVisible] = useState<boolean>(false);
  const [editChannelModalVisible, handleEditChannelModalVisible] = useState<boolean>(false);
  const [addChannelModalVisible, handleAddChannelModalVisible] = useState<boolean>(false);
  const [infoFormValues, setInfoFormValues] = useState({});
  const [currentChannelID, setCurrentChannelID] = useState<number>();
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<ChannelItem>();
  const [selectedRowsState, setSelectedRows] = useState<ChannelItem[]>([]);

  const InfoEditBtn: React.FC<{
    item: ChannelItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            key='add'
            onClick={() => {
              handleAddInfoModalVisible(true);
              setInfoFormValues(item);
            }}
          >
            添加
          </Menu.Item>
          <Menu.Item
            key='edit'
            onClick={() => {
              handleEditInfoModalVisible(true);
              setInfoFormValues(item);
              setCurrentChannelID(item.id);
            }}
          >
            编辑
          </Menu.Item>
        </Menu>
      }
    >
      <a>
        媒体管理 <DownOutlined />
      </a>
    </Dropdown>
  );

  async function syncTransferInfo() {
    const resp = await channelSyncTransferInfo({});
    if (resp.status === 'success') {
      message.success(resp.message);
    } else {
      message.error(resp.message);
    }
  }

  const {
    dispatch,
    listAndChannelList: { itemList },
  } = props;
  const columns: ProColumns<ChannelItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '频道名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '标签',
      dataIndex: 'label',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href=''>编辑</a>
          <Divider type='vertical' />
          <InfoEditBtn item={record} />
        </>
      ),
    },
    {
      title: '番号列表',
      dataIndex: 'edges.infos',
    },
    {
      title: '用户列表',
      dataIndex: 'edges.users',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'listAndChannelList/fetch',
      payload: {
        page,
        per_page: perPage,
      },
    });
  }, [dispatch, page, perPage]);

  const onChange = (newPage: number, pageSize?: number) => {
    setPerPage(pageSize === undefined ? 15 : pageSize);
    setPage(newPage);
  };

  const footer = [
    <Pagination
      key={'pagination'}
      total={itemList?.total}
      current={itemList?.current_page}
      onChange={onChange}
      defaultPageSize={perPage}
      pageSizeOptions={['15', '30', '60', '120', '250', '500']}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
    />,
  ];

  return (
    <PageContainer footer={footer}>
      <ProTable<ChannelItem>
        headerTitle='查询表格'
        actionRef={actionRef}
        rowKey='id'
        search={{
          labelWidth: 120,
        }}
        dataSource={itemList == null ? [] : itemList.data}
        pagination={false}
        toolBarRender={() => [
          <Button type='primary' onClick={() => handleAddChannelModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type='ghost' onClick={() => syncTransferInfo()}>
            <SyncOutlined /> 同步
          </Button>,
          <Button type='ghost' onClick={() => syncTransferInfo()}>
            <SyncOutlined /> Instruct同步
          </Button>,
        ]}
        request={async () => {
          dispatch({
            type: 'listAndChannelList/fetch',
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
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleInfoRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type='primary'>批量审批</Button>
        </FooterToolbar>
      )}
      <EditInfoForm
        onCancel={() => handleEditInfoModalVisible(false)}
        editModalVisible={editInfoModalVisible}
        id={currentChannelID === undefined ? 0 : currentChannelID}>
        <ProTable<ChannelItem, ChannelItem>
          onSubmit={async (value) => {
            const success = await handleInfoEdit(value);
            if (success) {
              handleEditInfoModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey='id'
          type='form'
          columns={columns}
        />
      </EditInfoForm>
      {infoFormValues && Object.keys(infoFormValues).length ? (
        <AddInfoForm
          onSubmit={async (value) => {
            const success = await handleInfoAdd(value);
            if (success) {
              handleAddInfoModalVisible(false);
              setCurrentChannelID(0);
              setInfoFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleAddInfoModalVisible(false);
            setInfoFormValues({});
          }}
          addModalVisible={addInfoModalVisible}
          values={infoFormValues}
        />
      ) : null}
      <AddChannelForm
        onSubmit={async (value) => {
          const success = await handleChannelAdd(value);
          if (success) {
            handleAddChannelModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddChannelModalVisible(false);
          setInfoFormValues({});
        }}
        addModalVisible={addChannelModalVisible}
        values={infoFormValues}
      />

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<ChannelItem>
            column={1}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default connect(
  ({
     listAndChannelList,
     loading,
   }: {
    listAndChannelList: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    listAndChannelList,
    loading: loading.models.listAndChannelList,
  }),
)(ChannelList);
