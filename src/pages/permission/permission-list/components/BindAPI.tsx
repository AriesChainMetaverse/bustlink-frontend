import React, {useEffect, useState} from 'react';
import { Form, Button, Input, Modal,  Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

import {queryAPIList, queryMenuList} from '../service';
import {forEach} from "lodash";
import {render} from "react-dom";

export interface FormValueTypeBindAPI extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface BindAPIProps {
  onCancel: (flag?: boolean, formVals?: FormValueTypeBindAPI) => void;
  onSubmit: (values: FormValueTypeBindAPI) => void;
  apiModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;


export interface BindAPIState {
  formVals: FormValueTypeBindAPI;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const BindAPI: React.FC<BindAPIProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueTypeBindAPI>({
    id: props.values.id,
    apis:props.values.apis,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleApiModalVisible,
    apiModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
      handleUpdate({ ...formVals, ...fieldsValue });

  };

  useEffect(() => {
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const apiList =  await queryAPIList()
    const elements: JSX.Element[] =[]
    apiList.forEach((item)=>{
      elements.push(
        <Checkbox key={item.id}
          value={item.id}
          style={{
            lineHeight: '32px',
          }}
        >
          {item.path} && {item.rule}

        </Checkbox>
      );
    })
    return elements
  }

  const renderContent = () => {
      return (
        <FormItem name="apis" label="API"
                  rules={[{required: true, message: '请设置权限的API'}]}>
          <Checkbox.Group>
            <Row>
              {CheckBoxItemList}
            </Row>
          </Checkbox.Group>
        </FormItem>
      );

  };

  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handleApiModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );

  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="给权限分配API"
      visible={apiModalVisible}
      footer={renderFooter()}
      onCancel={() => handleApiModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          apis:formVals.apis,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default BindAPI;
