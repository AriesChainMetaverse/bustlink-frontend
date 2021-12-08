import {CloudUploadOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, DatePicker, Drawer, Upload} from 'antd';
import React, { useState, useRef,Component  } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {updateDiscovery, addDiscovery, removeDiscovery,  querDiscoveryList} from './service';
import Editor from "for-editor";

/**
 * 添加公告
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDiscovery({ ...fields });
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
    await updateDiscovery({
      id:fields.id,
      title: fields.title,
      detail: fields.detail,
      mtype: fields.mtype,
      links:  fields.links.toString(),
      date:fields.date,
      rid: fields.rid,
      publish: fields.publish,
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
    await removeDiscovery({
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

const onClick = () => {
  console.log("23424")
  return false
}


const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const headers = {
    Authorization:`Bearer ${localStorage.getItem("token")}`
  };
  const uploadProps ={
    name: 'mediaFile',
    multiple: true,
    action: `/api/v0/admindiscovery/${row?.id}`,
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
    // beforeUpload(file: { type: string; }){
    //   console.log(file.type)
    //   const isAPK = file.type === 'application/vnd.android.package-archive';
    //   if (!isAPK) {
    //     message.error('只能上传 apk 文件哦！');
    //   }
    //   return isAPK;
    //
    // },
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'ID是唯一的',
      hideInForm: true,
      copyable:false,
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: false,
      hideInForm: false,
      valueType: 'textarea',
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
      title: '分类',
      dataIndex: 'mtype',
      hideInForm: false,
      valueEnum: {
        'none': { text: 'none', status: 'none' },
        'video': { text: 'video', status: 'video' },
        'photo': { text: 'photo', status: 'photo' },
        'both': { text: 'both', status: 'both' },

      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '分类必选',
          },
        ],
      },
    },
    {
      title: '日期',
      dataIndex: 'date',
      sorter: false,
      hideInForm: false,
      valueType: 'dateTime',
      renderFormItem: (dom, entity) => {
        return (
          <DatePicker
            showTime format="yyyy/MM/DD HH:mm:ss" placeholder="请选择时间"
          />
        );
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '时间必填项',
          },
        ],
      },
    },

    {
      title: '内容',
      dataIndex: 'detail',
      sorter: false,
      hideInForm: false,
      ellipsis:true,
      // valueType: 'textarea',
      renderFormItem: (item, {value,onChange} ) => {
        return (
          <Editor value={value} onChange={onChange}/>
        );
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '内容必填项',
          },
        ],
      },
    },
    {
      title: '链接',
      dataIndex: 'links',
      sorter: false,
      hideInForm: false,
      tip: '输入多个链接，请用,间隔',
      valueType: 'textarea',
      render: (textArray, entity) => {
        return (<div>
          {
            textArray.map(t=>{
              return (<li>{t}</li>)
            })
          }
        </div>)
      },
    },
    {
      title: 'rid',
      dataIndex: 'rid',
      hideInForm: false,
      hideInTable: false,
      hideInSearch: true,
      tip: '关联视频资源的rid',
    },
    // {
    //   title: '上传图/视频文件',
    //   dataIndex: 'mediaFile',
    //   hideInForm: true,
    //   hideInTable: true,
    //   hideInSearch: true,
    //
    //   render: (_, record) => (
    //     <>
    //       <Upload {...uploadProps}>
    //         <Button
    //           size={'small'}
    //           icon={<CloudUploadOutlined />}
    //           disabled={ !(row?.rid === undefined)}
    //         >点击上传</Button>
    //       </Upload>
    //     </>
    //   ),
    //
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
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="发现页列表"
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
        request={(params, sorter, filter) => querDiscoveryList({ ...params, sorter, filter })}
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
        {row?.title && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.title}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.title,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
