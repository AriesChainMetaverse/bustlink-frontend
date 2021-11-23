import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateAnnounce, addAnnounce, removeAnnounce, queryAnnounceList} from './service';
import Editor from "for-editor";
import { useIntl, FormattedMessage } from 'umi';

/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addAnnounce({ ...fields });
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
    await updateAnnounce({
      id:fields.id,
      announce_no: fields.announce_no,
      title: fields.title,
      content: fields.content,
      kind: fields.kind,
      link: fields.link,

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

  /**
   * 国际化配置
   */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.announce.indexForm.announce_no"
          defaultMessage="公告编号"
        />
      ),
      dataIndex: 'announce_no',
      tip: intl.formatMessage({
        id: 'pages.announce.indexForm.announce_no_tip',
        defaultMessage: '公告编号是唯一的',
      }),
      hideInForm: true,

    },
    {
      title: (
        <FormattedMessage
        id='pages.announce.indexForm.title'
        defaultMessage= '标题'
        />
      ),
      dataIndex: 'title',
      sorter: false,
      hideInForm: false,
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequired'
              defaultMessage= '必填项'
            />,
          },
        ],
      },
    },
    {
      title: <FormattedMessage
        id= 'pages.announce.indexForm.kind'
        defaultMessage= '分类'
      />,
      dataIndex: 'kind',
      hideInForm: false,
      valueEnum: {
        'notice': { text: intl.formatMessage({
            id: 'pages.announce.indexForm.kind_notice',
            defaultMessage: '系统通知',
          }),status: 'notice' },
        'announcement': { text: intl.formatMessage({
              id: 'pages.announce.indexForm.kind_announcement',
              defaultMessage: '公告',
            }), status: 'announcement' },
        'event': { text: intl.formatMessage({
            id: 'pages.announce.indexForm.kind_event',
            defaultMessage: '活动',
          }), status: 'event' },

      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequired'
              defaultMessage= '分类必选'
            />,
          },
        ],
      },
    },
    {
      title: <FormattedMessage
        id= 'pages.announce.indexForm.content'
        defaultMessage= '内容'
      />,
      dataIndex: 'content',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      // valueType: 'textarea',
      renderFormItem: (item,{value, onChange} ) => {
        return <Editor value={value} onChange={onChange}allowClear/>
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequired'
              defaultMessage= '必填项'
            />,
          },
        ],
      },
    },
    {
      title: <FormattedMessage
        id='pages.announce.indexForm.link'
        defaultMessage= '链接'
      />,
      dataIndex: 'link',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,
      valueType: 'textarea',

    },
    {
      title: <FormattedMessage
        id= 'pages.announce.indexForm.option'
        defaultMessage='操作'
      />,
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
            {intl.formatMessage({
              id: 'pages.announce.indexForm.set',
              defaultMessage: '配置',
            })}
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.announce.indexForm.list',
          defaultMessage: '公告列表',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> {intl.formatMessage({
            id: 'pages.announce.indexForm.newcreate',
            defaultMessage: '新建',
          })}
          </Button>,
        ]}
        request={(params, sorter, filter) => queryAnnounceList({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              {intl.formatMessage({
                id: 'pages.announce.indexForm.seleted',
                defaultMessage: '已选择',
              })} <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> &nbsp;&nbsp;
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
            {intl.formatMessage({
              id: 'pages.announce.indexForm.batchDelete',
              defaultMessage: '批量删除',
            })}
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
