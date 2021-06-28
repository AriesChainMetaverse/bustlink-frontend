import {CloudUploadOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Input, Drawer, Modal} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateUpdate, addUpdate, removeUpdate, queryUpdateList} from './service';
import Editor from "for-editor";
import {uploadScrape} from "@/pages/scrape/scrape-list/service";

/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUpdate({ ...fields });
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
    await updateUpdate({
      id:fields.id,
      os: fields.os,
      title: fields.title,
      detail: fields.detail,
      forcibly: fields.forcibly,
      publish: fields.publish,
      arch: fields.arch,
      version: fields.version,
      filename: fields.filename,
      attr: fields.attr,

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
    await removeUpdate({
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
      title: '版本号',
      dataIndex: 'version',
      sorter: true,
      hideInForm: false,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '版本号必填',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '包名',
      dataIndex: 'filename',
      // tip: '公告编号是唯一的',
      hideInForm: true,


    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: false,
      hideInForm: false,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '标题必填',
          },
        ],
      },
    },
    {
      title: '详述',
      dataIndex: 'detail',
      sorter: false,
      hideInForm: false,
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: false,
            message: '详述必填',
          },
        ],
      },
    },
    {
      title: '系统',
      dataIndex: 'os',
      hideInForm: false,
      valueEnum: {
        'android': { text: 'android', status: 'android' },
        'windows': { text: 'windows', status: 'windows' },
        'linux': { text: 'linux', status: 'linux' },

      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '系统必选',
          },
        ],
      },
    },
    {
      title: '系统位数',
      dataIndex: 'arch',
      hideInForm: false,
      hideInTable: true,
      valueEnum: {
        'amd64': { text: 'amd64', status: 'amd64' },
        'amd32': { text: 'amd32', status: 'amd32' },

      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必选',
          },
        ],
      },
    },
    {
      title: 'attr',
      dataIndex: 'attr',
      hideInForm: false,
      valueEnum: {
        'core': { text: 'core', status: 'core' },
        'app': { text: 'app', status: 'app' },

      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '必选',
          },
        ],
      },
    },
    {
      title: 'rid',
      dataIndex: 'rid',
      hideInForm: true,
      hideInTable: true,

    },
    {
      title: '已发布',
      dataIndex: 'publish',
      hideInForm: true,
      valueEnum: {
        false: { text: '否', status: false },
        true: { text: '是', status: true },
      },
    },
    {
      title: '强制升级',
      dataIndex: 'forcibly',
      hideInForm: true,
      valueEnum: {
        false: { text: '否', status: false },
        true: { text: '是', status: true },
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
        headerTitle="包更新列表"
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
        request={(params, sorter, filter) => queryUpdateList({ ...params, sorter, filter })}
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
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        modalVisible={createModalVisible}
      >
        {/*<ProTable<TableListItem, TableListItem>*/}
        {/*  onSubmit={async (value) => {*/}
        {/*    const success = await handleAdd(value);*/}
        {/*    if (success) {*/}
        {/*      handleModalVisible(false);*/}
        {/*      if (actionRef.current) {*/}
        {/*        actionRef.current.reload();*/}
        {/*      }*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  rowKey="id"*/}
        {/*  type="form"*/}
        {/*  columns={columns}*/}
        {/*/>*/}
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
        {row?.version && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.version}
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

export default TableList;
