import { PlusOutlined } from '@ant-design/icons';
import {Button,  message,  Drawer, Image} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {
  addRule,
  queryAdminPinList,
  syncAdminPin,
  updateAdminPin
} from './service';


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
    await updateAdminPin({
      id: fields.id,
      rid: fields.rid,
      status: fields.status,
      step: fields.step,
      relate: fields.relate,
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

async function initAdminInfor() {
  const hide = message.loading('正在同步最新pin状态数据');
  const resp = await syncAdminPin();
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
            src={localStorage.getItem("InformationImgUrl") + entity.rid + '/' + entity.poster_path + "?ts=1"}
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
      title: 'rid',
      dataIndex: 'rid',
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
        "waiting": { text: 'waiting', status: "waiting" },
        "pinning": { text: 'pinning', status: "pinning" },
        "failed": { text: 'failed', status: "failed" },
        "success": { text: 'success', status: "success" },
        "notfound": { text: 'notfound', status: "notfound" },
      },
    },

    {
      title: 'STEP',
      dataIndex: 'step',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        "add": { text: 'add', status: "add" },
        "remove": { text: 'remove', status: "remove" },
        "none": { text: 'none', status: "none" },

      },
    },
    {
      title: 'ReLate',
      dataIndex: 'relate',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        "informationv1": { text: 'informationv1', status: "informationv1" },
        "update": { text: 'update', status: "update" },
        "none": { text: 'none', status: "none" },

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
            配置
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="全量节点PIN资源列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => initAdminInfor()}>
            <PlusOutlined /> 同步最新PIN状态
          </Button>,
        ]}
        request={(params, sorter, filter) => queryAdminPinList({ ...params, sorter, filter })}
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
