import React, {useEffect, useState} from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';

import { TableListItem } from '../data.d';
import { getlocationByIP,isValidIP} from '../service';
import {string} from "prop-types";

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
    pid: props.values.pid,
    addrs: props.values.addrs,
    locations: getLocationList(props.values.addrs)
  });

  const [location, setLocation] = useState<[]>([]);
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

  useEffect(() => {
    getLocationList(formVals.addrs).then(r => setLocation(r));
  }, []);

  async function getLocationList(addrs) {
    const location = [];
    for (const item of addrs) {

      let lArr =[]
      let response2;
      lArr = item.toString().split("/")
      // eslint-disable-next-line no-await-in-loop
      if (isValidIP(lArr[2])) {
        response2 = await getlocationByIP(lArr[2])
        if (response2.data[0] !== undefined) {
          location.push(response2.data[0])
        }
      }
    }
    return location
  }


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
          name="pid"
          label="PID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="addrs"
          label="address"
        >
          <TextArea rows={10} disabled={false} />
        </FormItem>

        <FormItem
          name="Location"
          label="地理信息"
        >
          {location}
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        {/*<Button type="primary" onClick={() => handleNext()}>*/}
        {/*  完成*/}
        {/*</Button>*/}
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
      title="IP地址详情"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          pid: formVals.pid,
          addrs: formVals.addrs,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
