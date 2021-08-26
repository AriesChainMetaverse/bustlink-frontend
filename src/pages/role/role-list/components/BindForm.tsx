import React, { useState } from 'react';
import { Form, Button, Input, Modal,  Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueTypeBind extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface BindFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueTypeBind) => void;
  onSubmit: (values: FormValueTypeBind) => void;
  bindModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;


export interface BindFormState {
  formVals: FormValueTypeBind;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const BindForm: React.FC<BindFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueTypeBind>({

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
    onCancel: handlebindModalVisible,
    bindModalVisible,
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

  const checkboxItemList = () => {

    const items = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      items.push(
        <Checkbox
          value="newest"
          style={{
            lineHeight: '32px',
          }}
        >
          最新上架
        </Checkbox>
      );            // 这里父组件Examines，嵌套了子组件<OnTask/>
    }

    return (
      <FormItem name="category" label="分类"
                rules={[{ required: true, message: '请设置视频资源属性'}]}>
        <Checkbox.Group>
          <Row>
            {items}
          </Row>
        </Checkbox.Group>
      </FormItem>
      )

  }

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>

          {checkboxItemList()}



        </>
      );
    }

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
          <Button onClick={() => handlebindModalVisible(false, values)}>取消</Button>
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
    //       <Button onClick={() => handlebindModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         完成
    //       </Button>
    //     </>
    //   );
    // }
    return (
      <>
        <Button onClick={() => handlebindModalVisible(false, values)}>取消</Button>
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
      visible={bindModalVisible}
      footer={renderFooter()}
      onCancel={() => handlebindModalVisible()}
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

export default BindForm;
