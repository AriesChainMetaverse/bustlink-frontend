import { PlusOutlined } from '@ant-design/icons';
import {Button, Divider, message, Input, Drawer, Image} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

import { TableListItem } from './data.d';
import {updateSysOrganization, addSysOrganization, removeSysUser, querySysOrganizationList} from './service';


/**
 * 添加组织
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSysOrganization({ ...fields });
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
    await updateSysOrganization({
      id:fields.id,
      corporate_name: fields.corporate_name,
      corporate_hash: fields.corporate_hash,
      corporate_legal_user: fields.corporate_legal_user,
      corporate_id_card_facade: fields.corporate_id_card_facade,
      corporate_id_card_obverse: fields.corporate_id_card_obverse,
      corporate_code: fields.corporate_code,
      business_license: fields.business_license,
      comment: fields.comment,
      is_verify: fields.is_verify,

    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    console.log(error);
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
      tip: 'id是唯一的',
      hideInForm: true,

      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '企业名称',
      dataIndex: 'corporate_name',
      sorter: false,
      hideInForm: false,
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
      title: '法人资料存放目录',
      dataIndex: 'corporate_hash',
      sorter: false,
      hideInForm: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',

    },
    {
      title: '企业法人',
      dataIndex: 'corporate_legal_user',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',

    },
    {
      title: '法人身份证(正)',
      dataIndex: 'corporate_id_card_facade',
      sorter: false,
      hideInForm: true,
      hideInSearch: true,
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <Image
            width="150px"
            src={`data:image/png;base64,${entity.corporate_id_card_facade}`}
            fallback="/admin/failed/147x200.svg"
            crossOrigin="anonymous"
          />
        );
      },
    },
    {
      title: '法人身份证(反)',
      dataIndex: 'corporate_id_card_obverse',
      hideInSearch: true,
      hideInForm: true,
      render: (dom, entity) => {
        return (
          <Image
            width="150px"
            src={`data:image/png;base64,${entity.corporate_id_card_obverse}`}
            fallback="/admin/failed/147x200.svg"
            crossOrigin="anonymous"
          />
        );
      },
    },

    {
      title: '社会统一信用代码',
      dataIndex: 'corporate_code',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: '营业执照',
      dataIndex: 'business_license',
      sorter: false,
      hideInForm: true,
      hideInSearch: true,
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <Image
            width="150px"
            src={`data:image/png;base64,${entity.business_license}`}
            fallback="/admin/failed/147x200.svg"
            crossOrigin="anonymous"
          />
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'comment',
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
      title: '验证状态',
      dataIndex: 'is_verify',
      sorter: false,
      hideInForm: true,
      hideInSearch: true,
      valueType: 'text',
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
            编辑
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="组织列表"
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
        request={(params, sorter, filter) => querySysOrganizationList({ ...params, sorter, filter })}
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
          {/*<Button*/}
          {/*  onClick={async () => {*/}
          {/*    await handleRemove(selectedRowsState);*/}
          {/*    setSelectedRows([]);*/}
          {/*    actionRef.current?.reloadAndRest?.();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  批量删除*/}
          {/*</Button>*/}
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
