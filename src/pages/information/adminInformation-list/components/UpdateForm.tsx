import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col,Space} from 'antd';

import { TableListItem } from '../data.d';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
    frames_particulars:props.values.frames_particulars,
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
    return (
      <>
        <FormItem
          name="id"
          label="编号"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="video_no"
          label="番号"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <Form.Item label='跳帧图片设置'>

          <Form.List name="frames_particulars" >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      label='Index'
                      {...restField}
                      name={[name, 'index']}
                      fieldKey={[fieldKey, 'index']}
                      rules={[{ required: true, message: 'Missing index' }]}
                    >
                      <Input placeholder="index" type="number"/>
                    </Form.Item>

                    <Form.Item
                      label='时间（单位s）'
                      {...restField}
                      name={[name, 'time']}
                      fieldKey={[fieldKey, 'time']}
                      rules={[{ required: true, message: 'Missing time' }]}
                    >
                      <Input placeholder="time" type="number" />
                    </Form.Item>
                    <Form.Item
                      label='行号'

                      {...restField}
                      name={[name, 'row']}
                      fieldKey={[fieldKey, 'row']}
                      rules={[{ required: true, message: 'Missing row' }]}
                    >
                      <Input placeholder="row-NO" type="number"/>
                    </Form.Item>
                    <Form.Item
                      label='列号'

                      {...restField}
                      name={[name, 'column']}
                      fieldKey={[fieldKey, 'column']}
                      rules={[{ required: true, message: 'Missing column' }]}
                    >
                      <Input placeholder="column-NO" type="number" />
                    </Form.Item>
                    <Form.Item
                      label='标题'

                      {...restField}
                      name={[name, 'caption']}
                      fieldKey={[fieldKey, 'caption']}
                      rules={[{ required: false, message: 'Missing caption' }]}
                    >
                      <Input placeholder="caption" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>



      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
      return (
        <>
          {/*<Button style={{ float: 'left' }} onClick={backward}>*/}
          {/*  上一步*/}
          {/*</Button>*/}
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
      title="视频资源配置跳帧位置"
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
          frames_particulars:formVals.frames_particulars,

        }}
      >
        {renderContent()}


      </Form>
    </Modal>
  );
};

export default UpdateForm;
