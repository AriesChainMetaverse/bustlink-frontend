import React, { useState,Component  } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';
import moment from 'moment';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
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

    id: props.values.id,
    title: props.values.title,
    detail: props.values.detail,
    mtype: props.values.mtype,
    links: props.values.links,
    date:moment(props.values.date),
    publish: props.values.publish,
    rid: props.values.rid,
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

  // const vm = React.createRef()

  // const addImg = (file)=> {
  //   vm.current.$img2Url(file.name, 'file_url')
  //   console.log(file)
  // }


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
          name="date"
          label="日期"
        >
          <DatePicker
            showTime format="yyyy/MM/DD HH:mm:ss" placeholder="请选择时间"
          />
        </FormItem>
        <FormItem
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <TextArea rows={4} placeholder="请输入至少两个字符" />
        </FormItem>
        <FormItem
          name="rid"
          label="rid"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem name="mtype" label="分类">
          <Select style={{ width: '100%' }}>
            <Option value="none">none</Option>
            <Option value="video">video</Option>
            <Option value="photo">photo</Option>
            <Option value="both">both</Option>

          </Select>
        </FormItem>
        <FormItem
          name="detail"
          label="发现内容"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <Editor />
        </FormItem>
        <FormItem
          name="links"
          label="链接"
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
        <FormItem name="publish" label="是否发布">
          <RadioGroup style={{ width: '100%' }} >
            <Radio value={false} >否</Radio>
            <Radio value={true}>是</Radio>
          </RadioGroup>
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
          title: formVals.title,
          detail: formVals.detail,
          mtype: formVals.mtype,
          links: formVals.links,
          date:formVals.date,
          publish: formVals.publish,
          rid: formVals.rid,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
