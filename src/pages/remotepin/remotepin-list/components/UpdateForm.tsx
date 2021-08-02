import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
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

    video_no: props.values.video_no,
    id: props.values.id,
    rid: props.values.rid,
    status: props.values.status,
    title: props.values.title,
    step:props.values.step,
    relate:props.values.relate,

  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });

  };

  const renderContent = () => {

    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <FormItem
    //         name="time"
    //         label="开始时间"
    //         rules={[{ required: true, message: '请选择开始时间！' }]}
    //       >
    //         <DatePicker
    //           style={{ width: '100%' }}
    //           showTime
    //           format="YYYY-MM-DD HH:mm:ss"
    //           placeholder="选择开始时间"
    //         />
    //       </FormItem>
    //       <FormItem name="frequency" label="调度周期">
    //         <Select style={{ width: '100%' }}>
    //           <Option value="month">月</Option>
    //           <Option value="week">周</Option>
    //         </Select>
    //       </FormItem>
    //     </>
    //   );
    // }
    return (
      <>
        <FormItem
          name="id"
          label="编号"
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
          name="video_no"
          label="番号"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label="标题"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem name="status" label="状态">
          <Select style={{ width: '100%' }} disabled={true}>
            <Option value="waiting">waiting</Option>
            <Option value="pinning">pinning</Option>
            <Option value="failed">failed</Option>
            <Option value="success">success</Option>
            <Option value="notfound">notfound</Option>

          </Select>
        </FormItem>
        <FormItem name="relate" label="relate">
          <Select style={{ width: '100%' }} disabled={true}>
            <Option value="none">none</Option>
            <Option value="informationv1">informationv1</Option>
            <Option value="update">update</Option>

          </Select>
        </FormItem>
        <FormItem name="step" label="step">
          <Select style={{ width: '100%' }}>
            <Option value="add">add</Option>
            <Option value="remove">remove</Option>
            <Option value="none">none</Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
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
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
        {/*<Button type="primary" onClick={() => handleNext()}>*/}
        {/*  下一步*/}
        {/*</Button>*/}
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="全量节点pin配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          video_no: formVals.video_no,
          id: formVals.id,
          rid: formVals.rid,
          status: formVals.status,
          step:formVals.step,
          title:formVals.title,
          relate:formVals.relate,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
