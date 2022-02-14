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
  editChannelModalVisible: boolean;
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

const EditChannelForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({

    id: props.values.id,
    name: props.values.name,
    label: props.values.label,

  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleEditChannelModalVisible,
    editChannelModalVisible,
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
  const [needRequired, setNeedRequired] = useState<boolean>(props.values.mtype!=="none");

  // const addImg = (file)=> {
  //   vm.current.$img2Url(file.name, 'file_url')
  //   console.log(file)
  // }

  function handleChange(value) {
    if (value === "none"){
      setNeedRequired(false) ;
    }else{
      setNeedRequired(true) ;
    }
  }

  // const handleChange = e => {
  //   if (e.target.value === "none"){
  //     setNeedRequired(false) ;
  //   }else{
  //     setNeedRequired(true) ;
  //   }
  // };


  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem name="name" label="名称">
          <Select style={{ width: '100%' }} onChange={handleChange}>
            <Option value="default">default</Option>
            <Option value="free">free</Option>
            <Option value="vip">vip</Option>
            <Option value="spread">spread</Option>
            <Option value="custom">custom</Option>

          </Select>
        </FormItem>


        <FormItem
          name="label"
          label="标签"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}

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
        <Button onClick={() => handleEditChannelModalVisible(false, values)}>取消</Button>
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
    //       <Button onClick={() => handleEditChannelModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         完成
    //       </Button>
    //     </>
    //   );
    // }
    // return (
    //   <>
    //     <Button onClick={() => handleEditChannelModalVisible(false, values)}>取消</Button>
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
      title="频道信息修改"
      visible={editChannelModalVisible}
      footer={renderFooter()}
      onCancel={() => handleEditChannelModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          name: formVals.name,
          label: formVals.label,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default EditChannelForm;
