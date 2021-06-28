import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  os?: string;
  arch?: string;
  version?: string;
  filename?: string;
  attr?: string;
  title?: string;
  detail?: string;
  forcibly?: boolean;
  publish?: boolean;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
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
  const [formVals, setFormVals] = useState<FormValueType>({

    os: props.values.os,
    arch: props.values.arch,
    version: props.values.version,
    filename: props.values.filename,
    attr: props.values.attr,
    title: props.values.title,
    detail: props.values.detail,
    forcibly: props.values.forcibly,
    publish: props.values.publish,

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

// 拦截文件上传
  const beforeUploadHandle=(file)=>{
    setState(({fileData})=>({
      fileData:[...fileData,file],
    }))
    return false;
  }
//




  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="version"
          label="版本号"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="os"
          label="os"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="arch"
          label="arch"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="filename"
          label="filename"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="attr"
          label="attr"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="rid"
          label="rid"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <TextArea rows={4} placeholder="请输入至少两个字符" />
        </FormItem>
        <FormItem name="publish" label="是否发布更新">
          <RadioGroup style={{ width: '100%' }} >
            <Radio value={false} >否</Radio>
            <Radio value={true}>是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="forcibly" label="是否强制更新">
          <RadioGroup style={{ width: '100%' }}>
            <Radio value={false} >否</Radio>
            <Radio value={true}>是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          name="detail"
          label="内容"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <Editor />
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
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
      title="包更新配置"
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


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
