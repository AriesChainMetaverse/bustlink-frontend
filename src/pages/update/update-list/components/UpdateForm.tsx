import React, { useState } from 'react';
import { Form, Button,  Input, Modal, Radio, } from 'antd';


import { TableListItem } from '../data.d';
import {FormattedMessage, useIntl} from "umi";

export interface FormValueType extends Partial<TableListItem> {
  os?: string;
  arch?: string;
  version?: string;
  filename?: string;
  attr?: string;
  title?: string;
  detail?: string;
  forcibly?: boolean;
  truncate?: boolean;
  publish?: boolean;
  rid?: string;
  crc32?: string;
  id?: string;

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  /**
   * 国际化配置
   */
  const intl = useIntl();
  const [formVals, setFormVals] = useState<FormValueType>({

    id: props.values.id,
    os: props.values.os,
    arch: props.values.arch,
    version: props.values.version,
    filename: props.values.filename,
    attr: props.values.attr,
    title: props.values.title,
    detail: props.values.detail,
    forcibly: props.values.forcibly,
    truncate: props.values.truncate,
    publish: props.values.publish,
    rid: props.values.rid,
    crc32: props.values.crc32,

  });

  // const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // const forward = () => setCurrentStep(currentStep + 1);
  //
  // const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    // setFormVals({ ...formVals, ...fieldsValue });
    //
    // if (currentStep < 1) {
    //   forward();
    // } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    // }
  };

// // 拦截文件上传
//   const beforeUploadHandle=(file)=>{
//     setState(({fileData})=>({
//       fileData:[...fileData,file],
//     }))
//     return false;
//   }
//




  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="version"
          label={intl.formatMessage({
            id: 'pages.update.indexForm.version',
            defaultMessage: '版本号',
          })}
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="os"
          label="os"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="arch"
          label="arch"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="filename"
          label="filename"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="attr"
          label="attr"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="rid"
          label="rid"
        >
          <Input  disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label={intl.formatMessage({
            id: 'pages.update.indexForm.title',
            defaultMessage: '标题',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.ruleRequiredMin2'
              defaultMessage= '请输入至少两个字符！'
            />, min: 2 }]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({
            id: 'pages.ruleRequiredMin2',
            defaultMessage: '请输入至少两个字符',
          })} />
        </FormItem>
        <FormItem name="publish" label={intl.formatMessage({
          id: 'pages.update.indexForm.publish',
          defaultMessage: '是否发布更新',
        })}>
          <RadioGroup style={{ width: '100%' }} >
            <Radio value={false} >false</Radio>
            <Radio value={true}>true</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="forcibly" label={intl.formatMessage({
          id: 'pages.update.indexForm.upgrade',
          defaultMessage: '是否强制更新',
        })}>
          <RadioGroup style={{ width: '100%' }}>
            <Radio value={false} >false</Radio>
            <Radio value={true}>true</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="truncate" label={intl.formatMessage({
          id: 'pages.update.indexForm.clear',
          defaultMessage: '是否强制清库',
        })}>
          <RadioGroup style={{ width: '100%' }}>
            <Radio value={false}>false</Radio>
            <Radio value={true}>true</Radio>
          </RadioGroup>
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
          <Button onClick={() => handleUpdateModalVisible(false, values)}>
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
    // }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         上一步
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         完成
    //       </Button>
    //     </>
    //   );
    // }
    // return (
    //   <>
    //     <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //     <Button type="primary" onClick={() => handleNext()}>
    //       下一步
    //     </Button>
    //   </>
    // );
  };

  return (
    <Modal
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.update.updateForm.update',
        defaultMessage: '包更新配置',
      })}
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          os: formVals.os,
          arch: formVals.arch,
          version: formVals.version,
          filename: formVals.filename,
          attr: formVals.attr,
          title: formVals.title,
          detail: formVals.detail,
          publish: formVals.publish,
          forcibly: formVals.forcibly,
          truncate: formVals.truncate,
          rid: formVals.rid,
          crc32: formVals.crc32,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
