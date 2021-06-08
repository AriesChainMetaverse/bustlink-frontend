import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  announce_no?: string;
  content_english?: string;
  content_japanese?: string;
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
    content_english: props.values.content_english,
    content_japanese: props.values.content_japanese,

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
    // if (currentStep === 1) {
    //   return (
    //     <>
    //       <FormItem name="category" label="分类">
    //         <Checkbox.Group>
    //             <Row>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="newest"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //                 >
    //                   最新上架
    //                 </Checkbox>
    //               </Col>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="hottest"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //
    //                 >
    //                   人气最高
    //                 </Checkbox>
    //               </Col>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="star"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //                 >
    //                   明星
    //                 </Checkbox>
    //               </Col>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="producer"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //                 >
    //                   制作公司
    //                 </Checkbox>
    //               </Col>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="exclusive"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //                 >
    //                   独家内容
    //                 </Checkbox>
    //               </Col>
    //               <Col span={8}>
    //                 <Checkbox
    //                   value="normal"
    //                   style={{
    //                     lineHeight: '32px',
    //                   }}
    //                 >
    //                   正常
    //                 </Checkbox>
    //               </Col>
    //             </Row>
    //         </Checkbox.Group>
    //       </FormItem>
    //
    //
    //     </>
    //   );
    // }
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
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="announce_no"
          label="公告NO"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="content_english"
          label="英文公告"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
        <FormItem
          name="content_japanese"
          label="日文公告"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
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
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="公告内容配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" >
        <Step title="公告内容" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          announce_no: formVals.announce_no,
          id: formVals.id,
          content_english: formVals.content_english,
          content_japanese: formVals.content_japanese,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
