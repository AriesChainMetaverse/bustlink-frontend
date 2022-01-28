
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip,Upload ,message } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';

const FormItem = Form.Item;

const Dragger = Upload.Dragger;

interface TagMappingFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const TagMappingForm: FC<TagMappingFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [setShowPublicUsers] = React.useState(false);


  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndTagMappingFormClient/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };
  const headers = {
    // 'Content-Type': 'multipart/form-data',
    // Accept: 'application/json',
    Authorization:`Bearer ${localStorage.getItem("token")}`
  };

  const uploadProps ={
    name: 'tagMappingFile',
    multiple: true,
    action: '/api/v0/client/tagmapping/upload',
    showUploadList:false,
    method:"post",
    headers:headers,
    onChange(info) {
      console.log(info)
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    beforeUpload(file){
      console.log(file.type)
      const isCSV = file.type === 'application/vnd.ms-excel';
      if (!isCSV) {
        message.error('只能上传 csv 文件哦！');
      }
      return isCSV;

    },
  };


  return (
    <PageContainer >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="TagMapping"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >

          <FormItem style={{ marginTop: 16, height: 180 }}>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
            </Dragger>

          </FormItem>

        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndTagMappingFormClient/submitRegularForm'],
}))(TagMappingForm);
