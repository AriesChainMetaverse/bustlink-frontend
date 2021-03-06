import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  pid?: string;
  expired?: boolean;
  level?: string;
  service_port?: string;
  fail_counts?: string;
  addrs?: string;
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

    pid: props.values.pid,
    id: props.values.id,
    expired: props.values.expired,
    level: props.values.level,
    service_port: props.values.service_port,
    fail_counts: props.values.fail_counts,
    addrs: props.values.addrs,

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
          name="pid"
          label="PID"
        >
          <Input placeholder="?????????" disabled={true}/>
        </FormItem>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="?????????" disabled={true}/>
        </FormItem>
        <FormItem name="expired" label="????????????">
          <RadioGroup style={{ width: '100%' }} >
            <Radio value={false}>???</Radio>
            <Radio value={true}>???</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="level" label="??????"
                  rules={[{ required: true, message: '???????????????' }]}>
          <Select style={{ width: '100%' }}>
            <Option value="core">core</Option>
            <Option value="speed">speed</Option>
            <Option value="normal">normal</Option>
          </Select>
        </FormItem>
        <FormItem
          name="addrs" label="IP??????"
          help="??????IP??????????????????,??????"
          rules={[{ required: true, message: '?????????IP?????????', min: 10,transform:(value)=> {
            return value.toString()
          } }]}
        >
          <TextArea rows={4} placeholder="?????????IP?????????????????????????????????,??????" />
        </FormItem>
        <FormItem
          name="service_port" label="????????????"
          rules={[{ required: true, message: '?????????????????????'},{ type: 'number', message: '??????????????????',transform:(value)=> {return Number(value)}}]}
        >
          <TextArea rows={1} placeholder="??????????????????" />
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
          <Button type="primary" onClick={() => handleNext()}>
            ??????
          </Button>
        </>
      );
    // }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         ?????????
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         ??????
    //       </Button>
    //     </>
    //   );
    // }
    // return (
    //   <>
    //     <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
    //     <Button type="primary" onClick={() => handleNext()}>
    //       ?????????
    //     </Button>
    //   </>
    // );
  };

  return (
    <Modal
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Bootstrap??????"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          pid: formVals.pid,
          id: formVals.id,
          expired: formVals.expired,
          level: formVals.level,
          fail_counts: formVals.fail_counts,
          addrs: formVals.addrs,
          service_port: formVals.service_port,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
