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
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="announce_no"
          label= {intl.formatMessage({
            id: 'pages.announce.indexForm.announce_no',
            defaultMessage: '公告编号',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label= {intl.formatMessage({
            id: 'pages.announce.indexForm.title',
            defaultMessage: '标题',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequiredMin2'
              defaultMessage= '请输入至少两个字符的描述！'
            />, min: 2 }]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({
            id: 'pages.announce.indexForm.ruleRequiredMin2',
            defaultMessage: '请输入至少两个字符的描述',
          })} />
        </FormItem>
        <FormItem name="kind"
                  label= {intl.formatMessage({
                    id: 'pages.announce.indexForm.kind',
                    defaultMessage: '分类',
                  })}
        >
          <Select style={{ width: '100%' }}>
            <Option value="notice">
              {intl.formatMessage({
              id: 'pages.announce.indexForm.kind_notice',
              defaultMessage: '系统通知',
            })}
            </Option>
            <Option value="event">
              {intl.formatMessage({
              id: 'pages.announce.indexForm.kind_event',
              defaultMessage: '活动',
            })}
            </Option>
            <Option value="announcement">
              {intl.formatMessage({
              id: 'pages.announce.indexForm.kind_announcement',
              defaultMessage: '公告',
            })}
            </Option>

          </Select>
        </FormItem>
        <FormItem
          name="content"
          label= {intl.formatMessage({
            id: 'pages.announce.indexForm.content',
            defaultMessage: '公告内容',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequiredMin5'
              defaultMessage= '请输入至少五个字符的描述！'
            />, min: 5 }]}
        >
          <Editor placeholder={intl.formatMessage({
            id: 'pages.announce.indexForm.ruleRequiredMin5',
            defaultMessage: '请输入至少五个字符的描述',
          })}/>
        </FormItem>
        <FormItem
          name="link"
          label= {intl.formatMessage({
            id: 'pages.announce.indexForm.link',
            defaultMessage: '链接',
          })}
          rules={[{ required: false, message: <FormattedMessage
              id= 'pages.announce.indexForm.ruleRequiredMin5'
              defaultMessage= '请输入至少五个字符的描述！'
            />, min: 5 }]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({
            id: 'pages.announce.indexForm.ruleRequiredMin5',
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
        id: 'pages.announce.updateForm.update',
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
