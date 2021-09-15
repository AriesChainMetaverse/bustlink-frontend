import React, { useState } from 'react';
import { Form, Button, Input, Modal, Radio, Select, Steps } from 'antd';


import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  organization?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

const { TextArea } = Input;
const { Option } = Select;


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
    id: props.values.id,
    name: props.values.name,
    comment: props.values.comment,
    sex: props.values.sex,
    status: props.values.status,
    email: props.values.email,
    nickname: props.values.nickname,
    username: props.values.username,
    password: props.values.password,
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
          name="username"
          label="登录用户名"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}

        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="password"
          label="重置密码"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="nickname"
          label="昵称"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="name"
          label="名称"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="comment"
          label="描述"
        >
          <TextArea rows={4} placeholder="请输入至少两个字符" />
        </FormItem>


          <FormItem name="sex" label="性别">
            <Select style={{ width: '100%' }}>
              <Option value="0">女</Option>
              <Option value="1">男</Option>
            </Select>
          </FormItem>


        <FormItem
          name="status"
          label="状态"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="email"
          label="email"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="phone"
          label="phone"
        >
          <Input placeholder="请输入" />
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

          id: formVals.id,
          name: formVals.name,
          comment: formVals.comment,
          status: formVals.status,
          sex: formVals.sex,
          username: formVals.username,
          password: formVals.password,
          email: formVals.email,
          phone: formVals.phone,
          nickname: formVals.nickname,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
