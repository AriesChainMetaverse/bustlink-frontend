import React, {useState} from 'react';
import {Input, Modal, Radio, Form, Select, Button, Upload} from 'antd';
import Editor from "for-editor";
import {TableListItem} from "@/pages/update/update-list/data";
import {FormValueType, UpdateFormProps} from "@/pages/update/update-list/components/UpdateForm";
import {CloudUploadOutlined} from "@ant-design/icons";
import {array} from "prop-types";
import {FormattedMessage, useIntl} from "umi";

interface CreateFormProps {
  // modalVisible: boolean;
  // onCancel: () => void;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const FormItem = Form.Item;
const { TextArea } = Input;
const CreateForm: React.FC<UpdateFormProps> = (props) => {
  /**
   * 国际化配置
   */
  const intl = useIntl();
  const { modalVisible, onCancel } = props;
  const [formVals, setFormVals] = useState<FormValueType>({

    os: "",
    arch: "",
    version: "",
    attr: "",
    title: "",
    detail: "",


  });

  const {
    onSubmit: handleCreate,
    onCancel: handleModalVisible,
    values,
    // fileList,
    // showUploadList: false,
    // beforeUpload:handleBeforeUpload,



  } = props;

  const [form] = Form.useForm();

  // const beforeUploadHandle= (file) =>{
  //   console.log(file)
  //   setExefile(file)
  //   form.setFieldsValue({"exeFile":file})
  //   return false;
  // }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals(form.getFieldsValue());
    handleCreate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="version"
          label={intl.formatMessage({
            id: 'pages.update.indexForm.version',
            defaultMessage: '版本号',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.ruleRequired'
              defaultMessage= '请设置！'
            />, min: 2 }]}

        >
          <Input />
        </FormItem>
        <FormItem
          name="os"
          label="os"
          rules={[{ required: true, message:  <FormattedMessage
              id= 'pages.ruleRequired'
              defaultMessage= '请设置！'
            />, min: 2 }]}
        >
          <Select style={{ width: '100%' }}>
            <Option value="android">android</Option>
            <Option value="windows">windows</Option>
            <Option value="linux">linux</Option>
          </Select>
        </FormItem>
        <FormItem
          name="arch"
          label="arch"
          rules={[{ required: true, message:  <FormattedMessage
              id= 'pages.ruleRequired'
              defaultMessage= '请设置！'
            />, min: 2 }]}

        >
          <Select style={{ width: '100%' }}>
            <Option value="amd64">amd64</Option>
            <Option value="amd32">amd32</Option>
          </Select>
        </FormItem>

        <FormItem
          name="attr"
          label="attr"
          rules={[{ required: true, message:  <FormattedMessage
              id= 'pages.ruleRequired'
              defaultMessage= '请设置！'
            />, min: 2 }]}

        >
          <Select style={{ width: '100%' }}>
            <Option value="core">core</Option>
            <Option value="app">mobile</Option>
            <Option value="box">tvbox</Option>

          </Select>
        </FormItem>

        <FormItem
          name="title"
          label={intl.formatMessage({
            id: 'pages.update.indexForm.title',
            defaultMessage: '标题',
          })}
          rules={[{ required: true, message:  <FormattedMessage
              id= 'pages.ruleRequiredMin2'
              defaultMessage= '请输入至少两个字符！'
            />, min: 2 }]}
        >
          <TextArea rows={2} placeholder={intl.formatMessage({
            id: 'pages.ruleRequiredMin2',
            defaultMessage: '请输入至少两个字符',
          })} />
        </FormItem>
        <FormItem
          name="detail"
          label={intl.formatMessage({
            id: 'pages.update.indexForm.detail',
            defaultMessage: '内容',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.ruleRequiredMin5'
              defaultMessage= '请输入至少五个字符的描述！'
            />, min: 5 }]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({
            id: 'pages.ruleRequiredMin5',
            defaultMessage: '请输入至少五个字符的描述',
          })} />
        </FormItem>


      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    return (
      <>
        <Button onClick={() => handleModalVisible(false, values)}>
          {intl.formatMessage({
            id: 'pages.cancel',
            defaultMessage: '取消',
          })}
        </Button>
        <Button type="primary" onClick={() => handleNext()}>
          {intl.formatMessage({
            id: 'pages.submit',
            defaultMessage: '完成',
          })}
        </Button>
      </>
    );
  }
  return (
    <Modal
      width={1000}
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.update.createForm.create',
        defaultMessage: '新建更新包文件',
      })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
     <Form
       {...formLayout}
       form={form}

     >
       {renderContent()}
       {renderFooter()}
     </Form>



    </Modal>
  );
};

export default CreateForm;
