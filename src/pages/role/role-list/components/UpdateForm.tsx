import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  announce_no?: string;
  kind?: string;
  link?: string;
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

    announce_no: props.values.announce_no,
    id: props.values.id,
    title: props.values.title,
    content: props.values.content,
    kind: props.values.kind,
    link: props.values.link,

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
          name="announce_no"
          label="公告编号"
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
        <FormItem name="kind" label="分类">
          <Select style={{ width: '100%' }}>
            <Option value="notice">系统通知</Option>
            <Option value="event">活动</Option>
            <Option value="announcement">公告</Option>

          </Select>
        </FormItem>
        <FormItem
          name="content"
          label="公告内容"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <Editor />
        </FormItem>
        <FormItem
          name="link"
          label="链接"
          rules={[{ required: false, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
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
      title="通知内容配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          announce_no: formVals.announce_no,
          id: formVals.id,
          title: formVals.title,
          content: formVals.content,
          kind: formVals.kind,
          link: formVals.link,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
