
import {message, Drawer, Modal, Divider, Button} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {  updateAdminInstruct, addRule, queryAdminInstructList,syncInstruct } from './service';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {ScrapeItem} from "@/pages/scrape/scrape-list/data";
import {pushScrape} from "@/pages/scrape/scrape-list/service";
import {updateInforList} from "@/pages/information/adminInformation-list/service";

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
    await updateAdminInstruct({
      instruct_id: fields.id,
      adminnode_ids: fields.nodes,
      action: fields.action,

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
 *  pin
 * @param selectedRows
 */
const handlePin = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在设置pin指令');
  if (!selectedRows) return true;
  try {
    await updateAdminInstruct({
      ids: selectedRows.map((row) => row.id),
      action : 'pin'
    });
    hide();
    message.success('设置pin指令成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('设置pin指令失败，请重试');
    return false;
  }
};

/**
 *  unpin
 * @param selectedRows
 */
const handleUnpin = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在设置unpin指令');
  if (!selectedRows) return true;
  try {
    await updateAdminInstruct({
      ids: selectedRows.map((row) => row.id),
      action : 'unpin'
    });
    hide();
    message.success('设置unpin指令成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('设置unpin指令失败，请重试');
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

  const initInstruct = async (values: TableListItem) => {
    return await syncInstruct(values);
  };


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '资源番号',
      dataIndex: 'video_no',
      tip: '资源番号是唯一的',
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },

    },

    {
      title: 'PID',
      dataIndex: 'pid',
      valueType: 'textarea',
      hideInForm: true,
      hideInSearch: false,
      copyable: true,
      ellipsis: false,
    },

    {
      title: 'RID',
      dataIndex: 'rid',
      valueType: 'textarea',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      copyable: true,
      ellipsis: true,
    },
    // {
    //   title: '类型',
    //   dataIndex: 'type',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    // },
    {
      title: '动作状态',
      dataIndex: 'action',
      hideInForm: false,
      hideInSearch: true,
      valueEnum: {
        'none': { text: 'none', status: 'none' },
        'pin': { text: 'pin', status: 'pin' },
        'unpin': { text: 'unpin', status: 'unpin' },
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/*<a*/}
          {/*  onClick={() => {*/}
          {/*    handleUpdateModalVisible(true);*/}
          {/*    setStepFormValues(record);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  配置*/}
          {/*</a>*/}
          {/*<Divider type="vertical" />*/}
          <a
            onClick={() => {
              Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: `是否刷新${record.video_no}的指令`,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  initInstruct(record).then((resp) => {
                    if (resp.status === 'success') {
                      Modal.success({
                        okText: '朕已阅',
                        content: resp.message,
                      });
                    } else {
                      Modal.error({
                        okText: '朕已阅',
                        content: resp.message,
                      });
                    }
                  });
                },
              });
            }}
          >
            刷新初始指令
          </a>
        </>
      ),
    },

  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="已配指令"
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
        request={(params, sorter, filter) => queryAdminInstructList({ ...params, sorter, filter })}
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
              await handlePin(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量pin
          </Button>
          <Button
            onClick={async () => {
              await handleUnpin(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量unpin
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
