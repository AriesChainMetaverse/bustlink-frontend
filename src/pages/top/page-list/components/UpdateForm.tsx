import React, {useEffect, useState} from 'react';
import { Form, Button,  Input, Modal,  Select, } from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';
import {useIntl,FormattedMessage} from "umi";
import {queryParentPageList} from "@/pages/top/page-list/service";

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
    title: props.values.title,
    content: props.values.content,
    featured_index: props.values.featured_index,
    featured_content: props.values.featured_content,
    parent_id: props.values.parent_id,
  });

  // const [currentStep, setCurrentStep] = useState<number>(0);
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);
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

  useEffect(() => {
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const roleList =  await queryParentPageList()
    const elements: JSX.Element[] =[]

    elements.push(
      <Select.Option key="00000000-0000-0000-0000-000000000000"
                     value="00000000-0000-0000-0000-000000000000"
                     style={{
                       lineHeight: '32px',
                     }}
      >
        none
      </Select.Option>
    );

    roleList.forEach((item)=>{
      elements.push(
        <Select.Option key={item.id}
                       value={item.id}
                       style={{
                         lineHeight: '32px',
                       }}
        >
          {item.title}
        </Select.Option>
      );
    })
    return elements
  }


  const renderContent = () => {
    return (
      <>

        <FormItem
          name="id"
          label= {intl.formatMessage({
            id: 'pages.page.indexForm.ID',
            defaultMessage: '编号',
          })}
        >
          <Input placeholder="" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label= {intl.formatMessage({
            id: 'pages.page.indexForm.title',
            defaultMessage: '标题',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.page.indexForm.ruleRequiredMin2'
              defaultMessage= '请输入至少两个字符的描述！'
            />, min: 2 }]}
        >
          <TextArea rows={1} placeholder={intl.formatMessage({
            id: 'pages.page.indexForm.ruleRequiredMin2',
            defaultMessage: '请输入至少两个字符的描述',
          })} />
        </FormItem>
        <FormItem
          name="featured_index"
          label= {intl.formatMessage({
            id: 'pages.page.indexForm.featured_index',
            defaultMessage: '序列号',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.ruleRequired'
              defaultMessage= '请输入！'
            /> }]}
        >
          <Input placeholder="column-NO" type="number" />

        </FormItem>
        <FormItem
          name="featured_content"
          label= {intl.formatMessage({
            id: 'pages.announce.indexForm.featured_content',
            defaultMessage: '内容',
          })}
          rules={[{ required: true, message: <FormattedMessage
              id= 'pages.page.indexForm.ruleRequiredMin2'
              defaultMessage= '请输入至少两个字符的描述！'
            />, min: 2 }]}
        >
          <TextArea  rows={1} placeholder={intl.formatMessage({
            id: 'pages.page.indexForm.ruleRequiredMin2',
            defaultMessage: '请输入至少两个字符的描述',
          })}/>
        </FormItem>
        <FormItem name="parent_id" label="父页面"
                  rules={[{required: false, message: '请设置父页面'}]}>
          <Select>
            {CheckBoxItemList}
          </Select>
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
        defaultMessage: '页面配置',
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
          title: formVals.title,
          featured_index: formVals.featured_index,
          featured_content: formVals.featured_content,
          kind: formVals.kind,
          parent_id: formVals.parent_id,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
