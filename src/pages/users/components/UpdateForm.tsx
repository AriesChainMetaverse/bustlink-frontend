import React, { useState } from 'react';
import { Form, Button,  Input, Modal,  Select, } from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';
import {useIntl,FormattedMessage} from "umi";

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  announce_no?: string;
  title?: string;
  content?: string;
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

  /**
   * 国际化配置
   */
  const intl = useIntl();

  const [formVals] = useState<FormValueType>({

    id: props.values.id,
    username: props.values.username,
    nickname: props.values.nickname,
    serial: props.values.serial,
    level: props.values.level,
    username_state: props.values.username_state,
    telephone: props.values.telephone,
    email: props.values.email,
    telephone_state: props.values.telephone_state,
    email_state: props.values.email_state,
    state: props.values.state,

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
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="username"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.username',
            defaultMessage: '用户名',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="nickname"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.nickname',
            defaultMessage: '昵称',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="level"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.level',
            defaultMessage: '会员等级',
          })}
        >
          <Input placeholder="" type="number"/>
        </FormItem>

        <FormItem name="state"
                  label= {intl.formatMessage({
                    id: 'pages.user.indexForm.state',
                    defaultMessage: '状态',
                  })}
        >
          <Select style={{ width: '100%' }}>

            <Option value="formal">
              formal
            </Option>
            <Option value="unauthorized">
              unauthorized
            </Option>
            <Option value="authorized">
              authorized
            </Option>
            <Option value="unregistered">
              unregistered
            </Option>
            <Option value="registered">
              registered
            </Option>
            <Option value="register_failed">
              register_failed
            </Option>
          </Select>
        </FormItem>
        <FormItem
          name="username_state"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.username_state',
            defaultMessage: '用户名状态',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="telephone"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.telephone',
            defaultMessage: '手机',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="email"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.email',
            defaultMessage: '邮箱',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>

        <FormItem
          name="telephone_state"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.telephone_state',
            defaultMessage: '手机状态',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="email_state"
          label= {intl.formatMessage({
            id: 'pages.user.indexForm.email_state',
            defaultMessage: '邮箱状态',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>            {intl.formatMessage({
          id: 'pages.cancel',
          defaultMessage: '取消',
        })}</Button>
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
        id: 'pages.user.updateForm.update',
        defaultMessage: '通知内容配置',
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
          username: formVals.username,
          nickname: formVals.nickname,
          serial: formVals.serial,
          level: formVals.level,
          username_state: formVals.username_state,
          telephone: formVals.telephone,
          email: formVals.email,
          telephone_state: formVals.telephone_state,
          email_state: formVals.email_state,
          state: formVals.state,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
