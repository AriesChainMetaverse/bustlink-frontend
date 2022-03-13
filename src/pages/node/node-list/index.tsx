
import {message, Drawer, Button, Divider} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
// import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {  removeNode, queryNodeList,updateNode} from './service';
import moment from 'moment';
import {FormattedMessage} from "umi";
import BindForm, { FormValueTypeBind } from './components/BindForm';

/**
 * 添加公告
 * @param fields
 */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addAnnounce({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

/**
 * 更新节点
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateAnnounce({
//       id:fields.id,
//       announce_no: fields.announce_no,
//       title: fields.title,
//       content: fields.content,
//       kind: fields.kind,
//       link: fields.link,
//
//     });
//     hide();
//
//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };
/**
 * 给节点分组
 * @param fields
 */
const handleBind = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateNode({
      node_id:fields.id,
      group_id:fields.admin_node_group_adminnodegroup
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
    await removeNode({
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
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'PID',
      dataIndex: 'pid',
      tip: '节点ID是唯一',
      hideInForm: true,
      copyable: true,
      ellipsis: false,
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '分组',
      dataIndex: 'group_name',
      sorter: false,
      hideInForm: false,
      valueType: 'textarea',
      copyable: true,
      hideInSearch: false,
    },

    {
      title: '分类',
      dataIndex: 'type',
      sorter: false,
      hideInForm: true,
      hideInSearch: false,
      hideInTable: false,
      valueEnum: {
        '0': { text: 'Server', status: '0' },
        '1': { text: 'Adapter', status: '1' },
        '2': { text: 'Box', status: '2' },
        '3': { text: 'Mobile', status: '3' },
        '4': { text: 'Max', status: '4' },
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      sorter: false,
      hideInForm: true,
      hideInSearch: false,
      hideInTable: false,
      valueEnum: {
        '0': { text: 'Initialized', status: '0' },
        '1': { text: 'Start', status: '1' },
        '2': { text: 'Online', status: '2' },
        '3': { text: 'Offline', status: '3' },
        '4': { text: 'Max', status: '4' },
      },
    },

    // {
    //   title: '地理地址',
    //   dataIndex: 'location',
    //   sorter: false,
    //   hideInForm: true,
    //   hideInSearch: true,
    //   valueType: 'textarea',
    //   render: (textArray) => {
    //     return (<div>
    //       {
    //         textArray.map(t=>{
    //           return (<li>{t}</li>)
    //         })
    //       }
    //     </div>)
    //   },
    // },

    {
      title: '设备序列号',
      dataIndex: 'serial',
      sorter: false,
      hideInForm: false,
      valueType: 'textarea',
      copyable: true,
      hideInSearch: true,
    },

    {
      title: '最新响应时间',
      dataIndex: 'last_online',
      hideInForm: false,
      hideInSearch: true,

      render: (text, entity) => {
        if(text === undefined || text ==="-"){
          return "-";
        }
        // @ts-ignore
        return moment(parseInt(String(text / 1000000), 10)).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: "操作",
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
            IP详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleBindModalVisible(true);
              setStepFormValues(record);
            }}
          >
            设置分组
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="节点列表"
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
        request={(params, sorter, filter) => queryNodeList({ ...params, sorter, filter })}
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
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      {/*<CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>*/}
      {/*  <ProTable<TableListItem, TableListItem>*/}
      {/*    onSubmit={async (value) => {*/}
      {/*      const success = await handleAdd(value);*/}
      {/*      if (success) {*/}
      {/*        handleModalVisible(false);*/}
      {/*        if (actionRef.current) {*/}
      {/*          actionRef.current.reload();*/}
      {/*        }*/}
      {/*      }*/}
      {/*    }}*/}
      {/*    rowKey="id"*/}
      {/*    type="form"*/}
      {/*    columns={columns}*/}
      {/*  />*/}
      {/*</CreateForm>*/}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          // onSubmit={async (value) => {
          //   const success = await handleUpdate(value);
          //   if (success) {
          //     handleUpdateModalVisible(false);
          //     setStepFormValues({});
          //     if (actionRef.current) {
          //       actionRef.current.reload();
          //     }
          //   }
          // }}
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
