import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import BindForm, { FormValueTypeBind } from './components/BindForm';
import BindAPI, { FormValueTypeBindAPI } from './components/BindAPI';
import { TableListItem } from './data.d';
import {updatePermission, addPermission, removePermission, queryPermissionList, bindMenu,bindAPI} from './service';


/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    const response = await addPermission({ ...fields });

    if (response.status === "success"){
      hide();
      message.success('添加成功');
      return true;
    }
    hide();
    console.log(response.message)
    message.error('添加失败请重试！');
    return false;

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
    const response = await updatePermission({
      id:fields.id,
      name: fields.name,
      title: fields.title,
      comment: fields.comment,

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
 * 给角色分配权限
 * @param fields
 */
const handleBind = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await bindMenu({
      permission_id:fields.id,
      menu_ids:fields.menus
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
 * 给权限分配API
 * @param fields
 */
const handleBindAPI = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await bindAPI({
      permission_id:fields.id,
      api_ids:fields.apis
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
    await removePermission({
      ids: selectedRows.map((row) => row.id),
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

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [bindModalVisible, handleBindModalVisible] = useState<boolean>(false);
  const [apiModalVisible, handleApiModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'id是唯一的',
      hideInForm: true,

      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '名称',
      dataIndex: 'name',
      sorter: false,
      hideInForm: false,
      hideInSearch: false,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'comment',
      hideInSearch: false,
      hideInForm: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
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
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              handleBindModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置菜单
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              handleApiModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置API
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="权限列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryPermissionList({ ...params, sorter, filter })}
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
              <span>
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <BindForm
          onSubmit={async (value) => {
            const success = await handleBind(value);
            if (success) {
              handleBindModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleBindModalVisible(false);
            setStepFormValues({});
          }}
          bindModalVisible={bindModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <BindAPI
          onSubmit={async (value) => {
            const success = await handleBindAPI(value);
            if (success) {
              handleApiModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleApiModalVisible(false);
            setStepFormValues({});
          }}
          apiModalVisible={apiModalVisible}
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
