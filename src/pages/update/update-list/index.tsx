import {CloudUploadOutlined,  PlusOutlined} from '@ant-design/icons';
import {Button,  message,  Drawer, Upload} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateUpdate, addUpdate, removeUpdate, queryUpdateList} from './service';
import {FormattedMessage, useIntl} from "umi";


/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
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
      truncate: fields.truncate,
      publish: fields.publish,
      arch: fields.arch,
      version: fields.version,
      filename: fields.filename,
      attr: fields.attr,
      rid: fields.rid,
      crc32: fields.crc32,
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

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function cateroryTrans (catetoryList){
//   return catetoryList.toString()
// }

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const headers = {
    // 'Content-Type': 'multipart/form-data',
    // Accept: 'application/json',
    Authorization:`Bearer ${localStorage.getItem("token")}`
  };
  /**
   * 国际化配置
   */
  const intl = useIntl();
  const uploadProps ={
    name: 'exeFile',
    multiple: true,
    action: `/api/v0/admin/update/${row?.id}`,
    showUploadList:false,
    method:"post",
    headers:headers,
    onChange(info: { file: { response?: any; name?: any; status?: any; }; fileList: any; }) {
      console.log(info)
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {

        if(info.file.response.status ==="success"){
          message.success(`${info.file.name} 文件上传成功.`);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }else{
          message.error(`${info.file.name} 文件上传失败.[${info.file.response.message}]`);
        }


      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    beforeUpload(file: { type: string; }){
      console.log(file.type)
      const isAPK = file.type === 'application/vnd.android.package-archive';
      if (!isAPK) {
        message.error('只能上传 apk 文件哦！');
      }
      return isAPK;

    },
  };


  const columns: ProColumns<TableListItem>[] = [
    {
      title: <FormattedMessage
        id="pages.update.indexForm.version"
        defaultMessage="版本号"
      />,
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
      title: 'id',
      dataIndex: 'id',
      // tip: '公告编号是唯一的',
      hideInForm: true,
      hideInSearch: true,
      copyable: true,

    },

    {
      title: <FormattedMessage
        id="pages.update.indexForm.filename"
        defaultMessage="包名"
      />,
      dataIndex: 'filename',
      // tip: '公告编号是唯一的',
      hideInForm: true,
      hideInSearch: true,


    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.title"
        defaultMessage="标题"
      />,
      dataIndex: 'title',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,

      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage
              id="pages.ruleRequired"
              defaultMessage="必选"
            />,
          },
        ],
      },
    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.detail"
        defaultMessage="详述"
      />,
      dataIndex: 'detail',
      sorter: false,
      hideInForm: false,
      hideInSearch: true,

      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: false,
            message: <FormattedMessage
              id="pages.ruleRequired"
              defaultMessage="必选"
            />,
          },
        ],
      },
    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.os"
        defaultMessage="系统"
      />,
      dataIndex: 'os',
      hideInForm: false,
      hideInSearch: true,

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
      title: 'arch',
      dataIndex: 'arch',
      hideInForm: false,
      hideInTable: true,
      hideInSearch: true,

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
      hideInSearch: true,

      valueEnum: {
        'core': { text: 'core', status: 'core' },
        'app': { text: 'mobile', status: 'app' },
        'box': { text: 'tvbox', status: 'box' },

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
      hideInSearch: true,

    },
    {
      title: 'crc32',
      dataIndex: 'crc32',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,

    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.publish"
        defaultMessage="已发布"
      />,
      dataIndex: 'publish',
      hideInForm: true,
      hideInSearch: true,

      valueEnum: {
        false: { text: 'false', status: false },
        true: { text: 'true', status: true },
      },
    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.upgrade"
        defaultMessage="强制升级"
      />,
      dataIndex: 'forcibly',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        false: { text: 'false', status: false },
        true: { text: 'true', status: true },
      },
    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.clear"
        defaultMessage="清库"
      />,
      dataIndex: 'truncate',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        false: { text: 'false', status: false },
        true: { text: 'true', status: true },
      },
    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.uploadfile"
        defaultMessage="上传包文件"
      />,
      dataIndex: 'exeFile',
      hideInForm: false,
      hideInTable: true,
      hideInSearch: true,

      render: (_, record) => (
        <>
          <Upload {...uploadProps}>
            <Button
              size={'small'}
              icon={<CloudUploadOutlined />}
              disabled={ !(row?.rid === undefined)}
            >点击上传</Button>
          </Upload>
        </>
      ),

    },
    {
      title: <FormattedMessage
        id="pages.update.indexForm.option"
        defaultMessage="操作"
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
              id: 'pages.update.indexForm.set',
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
          id: 'pages.update.indexForm.list',
          defaultMessage: '包更新列表',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> {intl.formatMessage({
            id: 'pages.newcreate',
            defaultMessage: '新建',
          })}
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
              {intl.formatMessage({
                id: 'pages.seleted',
                defaultMessage: '已选择',
              })}  <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> &nbsp;&nbsp;
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
            {intl.formatMessage({
              id: 'pages.batchDelete',
              defaultMessage: '批量删除',
            })}
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
