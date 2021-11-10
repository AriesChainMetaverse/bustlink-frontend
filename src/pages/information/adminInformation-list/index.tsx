import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, message, Input, Drawer, Image} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateRule, addRule, removeRule, queryInforList, updateInforList,initCreateAdminInfor,updateAdminInformationFrames} from './service';
import {channelSyncInstructInfo} from "@/pages/channel/service";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  // const hide = message.loading('正在添加');
  // try {
  //   await addRule({ ...fields });
  //   hide();
  //   message.success('添加成功');
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('添加失败请重试！');
  //   return false;
  // }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    const response = await updateAdminInformationFrames({
      id:fields.id,
      name: fields.video_no,
      frames_particulars: fields.frames_particulars,

    });

    if (response.status === "success"){
      hide();
      message.success('配置成功');
      return true;
    }
    hide();
    console.log(response.message)
    message.error('配置失败请重试！');
    return false;

  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  上架
 * @param selectedRows
 */
const handleUp = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在上架');
  if (!selectedRows) return true;
  try {
    await updateInforList({
      ids: selectedRows.map((row) => row.id),
      status : 'up'
    });
    hide();
    message.success('上架成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('上架失败，请重试');
    return false;
  }
};

/**
 *  下架
 * @param selectedRows
 */
const handleDown = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在下架');
  if (!selectedRows) return true;
  try {
    await updateInforList({
      ids: selectedRows.map((row) => row.id),
      status : 'down'
    });
    hide();
    message.success('下架成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('下架失败，请重试');
    return false;
  }
};
async function initAdminInfor() {
  const hide = message.loading('正在同步AdminInformation数据');
  const resp = await initCreateAdminInfor();
  if (resp.status === 'success') {
    hide();
    message.success(resp.message);
  } else {
    hide();
    message.error(resp.message);
  }
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
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        "default": { text: '未设置', status: "default" },
        "up": { text: '已上架', status: "up" },
        "down": { text: '已下架', status: "down" },
      },
    },
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
            配置跳帧图片
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="视频列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => initAdminInfor()}>
            <PlusOutlined /> AdminInfor同步
          </Button>,
        ]}
        request={(params, sorter, filter) => queryInforList({ ...params, sorter, filter })}
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
              await handleUp(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量上架
          </Button>
          <Button
            onClick={async () => {
              await handleDown(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量下架
          </Button>
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
