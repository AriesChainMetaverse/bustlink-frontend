import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import BindForm, { FormValueTypeBind } from './components/BindForm';
import { TableListItem } from './data.d';
import {updateSysUser, addSysUser, removeSysUser, queryRoleList, bindRole, querySysUserList} from './service';
import Editor from "for-editor";
import {array} from "prop-types";

/**
 * 添加组织
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSysUser({ ...fields });
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
    await updateSysUser({
      id:fields.id,
      name: fields.name,
      status: fields.status,
      username: fields.username,
      password: fields.password,
      nickname: fields.nickname,
      email: fields.email,
      phone: fields.phone,
      sex: fields.sex,
      comment: fields.comment,

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
 * 给角色分配权限
 * @param fields
 */
const handleBind = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await bindRole({
      user_id:fields.id,
      role_ids:fields.roles
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
    await removeSysUser({
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

function cateroryTrans (catetoryList){
  return catetoryList.toString()
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [bindModalVisible, handleBindModalVisible] = useState<boolean>(false);
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
      title: '用户名',
      dataIndex: 'username',
      sorter: false,
      hideInForm: false,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户名必填',
          },
        ],
      },
    },
    {
      title: '初始密码',
      dataIndex: 'password',
      sorter: false,
      hideInForm: false,
      hideInTable: true,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '初始密码必填',
          },
        ],
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',

    },
    {
      title: '状态',
      dataIndex: 'status',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true,
      hideInForm: false,

    },

    {
      title: '性别',
      dataIndex: 'sex',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',
      valueEnum: {
        0: { text: '女', status: 0 },
        1: { text: '男', status: 1 },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '性别必填',
          },
        ],
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',
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
            配置角色
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="系统用户列表"
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
        request={(params, sorter, filter) => querySysUserList({ ...params, sorter, filter })}
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
                {/*服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万*/}
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
