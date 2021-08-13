import React, { useState } from 'react';
import { Form, Button, Input, Modal,  Select, Steps ,Checkbox,Row,Col} from 'antd';

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
    intro: props.values.intro,
    lower_banner: props.values.lower_banner,
    title: props.values.title,
    top_right:props.values.top_right,
    category:props.values.category,
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

    if (currentStep < 1) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="category" label="分类"
                    rules={[{ required: true, message: '请设置视频资源属性'}]}>
            <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value="newest"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      最新上架
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="top"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      置顶
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="special"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      推荐
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="hottest"
                      style={{
                        lineHeight: '32px',
                      }}

                    >
                      人气最高
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="star"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      明星
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="producer"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      制作公司
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="exclusive"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      独家内容
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="normal"
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      正常
                    </Checkbox>
                  </Col>
                </Row>
            </Checkbox.Group>
          </FormItem>
          <FormItem name="lower_banner" label="底标">
            <Select style={{ width: '100%' }}>
              <Option value="free">免费</Option>
              <Option value="discount">折扣</Option>
              <Option value="event">限免</Option>
              <Option value="premium">精品</Option>
              <Option value="collection">收藏</Option>
              <Option value="liked">喜欢</Option>
              <Option value="none">无</Option>
            </Select>
          </FormItem>
          <FormItem name="top_right" label="右上角标">
            <Select style={{ width: '100%' }}>
              <Option value="free">免费</Option>
              <Option value="discount">折扣</Option>
              <Option value="event">限免</Option>
              <Option value="premium">精品</Option>
              <Option value="collection">收藏</Option>
              <Option value="liked">喜欢</Option>
              <Option value="none">无</Option>
            </Select>
          </FormItem>

        </>
      );
    }
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
          name="video_no"
          label="番号"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label="标题"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="intro"
          label="视频简介"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
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
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="视频资源配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="配置分类" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          video_no: formVals.video_no,
          id: formVals.id,
          intro: formVals.intro,
          lower_banner: formVals.lower_banner,
          title:formVals.title,
          top_right:formVals.top_right,
          category:formVals.category,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
