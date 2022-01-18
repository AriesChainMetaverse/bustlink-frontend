import {PlusOutlined} from '@ant-design/icons';
import {Avatar, Button, Divider, Drawer, Input, message} from 'antd';
import React, {useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {UserItem} from './data.d';
import {addUser, queryUser, removeUser, updateUser} from './service';
import {useIntl} from "umi";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: UserItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({...fields});
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
    await updateUser({
      id: fields.id,
      username: fields.username,
      nickname: fields.nickname,
      level: fields.level,
      username_state: fields.username_state,
      telephone: fields.telephone,
      email: fields.email,
      telephone_state: fields.telephone_state,
      email_state: fields.email_state,
      state: fields.state,
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
const handleRemove = async (selectedRows: UserItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
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

const UserList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<UserItem[]>([]);
  /**
   * 国际化配置
   */
  const intl = useIntl();
  const columns: ProColumns<UserItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      tip: '客户端生成唯一',
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
      title: '用户头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (dom, entity) => {
        return <Avatar
          src={'http://127.0.0.1:18080/link/bafybeigaywv3husgeyjlmnyyxl7tbvuaeesfzgwzkpfwjbh2h4bzh4csau/image/thumb.jpg' + "?ts=" + Math.round(Date.now() / 1000)}
          shape="square" size="large"/>;
      },
    },
    {
      title: '账号状态',
      dataIndex: 'username_state',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: '手机号',
      dataIndex: 'telephone',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '手机号状态',
      dataIndex: 'telephone_state',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,

    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '邮箱状态',
      dataIndex: 'email_state',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,

    },
    {
      title: '序列号',
      dataIndex: 'serial',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      valueType: 'textarea',
      hideInSearch: true,
      // sorter: true,
      // hideInForm: true,
    },
    {
      title: '会员等级',
      dataIndex: 'level',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      renderText: (val: string) => `${val} 级`,
    },
    {
      title: '状态',
      dataIndex: 'state',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        'formal': {text: 'formal', status: 'formal'},
        'unauthorized': {text: 'unauthorized', status: 'unauthorized'},
        'authorized': {text: 'authorized', status: 'authorized'},
        'unregistered': {text: 'unregistered', status: 'unregistered'},
        'registered': {text: 'registered', status: 'registered'},
        'register_failed': {text: 'register_failed', status: 'register_failed'},

      },
    },
    // {
    //   title: '在线时长',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   valueType: 'dateTime',
    //   hideInForm: true,
    //   renderFormItem: (item, {defaultRender, ...rest}, form) => {
    //     const status = form.getFieldValue('state');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder="请输入异常原因！"/>;
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
          <Divider type="vertical"/>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserItem>
        headerTitle="用户查询"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined/> 新建
          // </Button>,
        ]}
        request={(params, sorter, filter) => queryUser({...params, sorter, filter})}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              {/*<span>*/}
              {/*  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万*/}
              {/*</span>*/}
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
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<UserItem, UserItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
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
        {row?.username && (
          <ProDescriptions<UserItem>
            column={2}
            title={row?.username}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.username,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
