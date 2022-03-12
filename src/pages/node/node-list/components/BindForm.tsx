import React, {useEffect, useState} from 'react';
import { Form, Button, Input, Modal,  Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

import { queryNodeGroupList} from '../service';
import {forEach} from "lodash";
import {render} from "react-dom";

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
    id: props.values.id,
    admin_node_group_adminnodegroup:props.values.admin_node_group_adminnodegroup,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handlebindModalVisible,
    bindModalVisible,
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

    const permissonList =  await queryNodeGroupList()
    const elements: JSX.Element[] =[]

    elements.push(
      <Select.Option key="00000000-0000-0000-0000-000000000000"
                     value="00000000-0000-0000-0000-000000000000"
                     style={{
                       lineHeight: '32px',
                     }}
      >
        none
      </Select.Option>
    );

    permissonList.forEach((item)=>{
      elements.push(
        <Select.Option key={item.id}
                       value={item.id}
                       style={{
                         lineHeight: '32px',
                       }}
        >
          {item.name}
        </Select.Option>
      );
    })
    return elements
  }

  const renderContent = () => {
      return (
        <FormItem name="admin_node_group_adminnodegroup" label="分组"
                  rules={[{required: true, message: '请设置分组'}]}>
          <Select>
              {CheckBoxItemList}
          </Select>
        </FormItem>
      );

  };

  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handlebindModalVisible(false, values)}>取消</Button>
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
      title="给节点分组"
      visible={bindModalVisible}
      footer={renderFooter()}
      onCancel={() => handlebindModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          admin_node_group_adminnodegroup:formVals.admin_node_group_adminnodegroup,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default BindForm;
