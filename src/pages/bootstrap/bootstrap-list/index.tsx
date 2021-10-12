import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {addBootstrap, removeAnnounce, queryBootstrapList, updateBootstrap} from './service';


/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    const response = await addBootstrap({ ...fields });

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
    const response = await updateBootstrap({
      id:fields.id,
      pid: fields.pid,
      expired:  fields.expired,
      level:  fields.level,
      service_port:  fields.service_port,
      fail_counts: fields.fail_counts,
      addrs:  fields.addrs.toString(),

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
    console.log(error)
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
    await removeAnnounce({
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
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '节点ID',
      dataIndex: 'pid',
      tip: '节点ID（pid）是唯一',
      hideInForm: false,
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '节点PID必填',
          },
        ],
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'addrs',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      tip: '输入过多个ip地址，请用,间隔',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'IP地址必填',
          },
        ],
      },
      render: (textArr, entity) => {
        return (<div>
          {
            textArr.map(t=>{
              return (<li>{t}</li>)
            })
          }
        </div>)
      },
    },
    {
      title: '是否到期',
      dataIndex: 'expired',
      hideInForm: false,
      hideInSearch: true,
      valueEnum: {
        false: { text: '未到期', status: false },
        true: { text: '已到期', status: true },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '是否到期必填',
          },
        ],
      },
    },
    {
      title: '等级',
      dataIndex: 'level',
      sorter: false,
      hideInForm: false,
      valueEnum: {
        'core': { text: 'core', status:'core' },
        'speed': { text: 'speed', status:'speed' },
        'normal': { text: 'normal', status:'normal' },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '等级必填',
          },
        ],
      },
    },
    {
      title: '服务端口',
      dataIndex: 'service_port',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'number',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '服务端口必填',
          },
        ],
      },
    },
    {
      title: 'fail_counts',
      dataIndex: 'fail_counts',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'number',
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
        headerTitle="bootstrap列表"
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
        request={(params, sorter, filter) => queryBootstrapList({ ...params, sorter, filter })}
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
