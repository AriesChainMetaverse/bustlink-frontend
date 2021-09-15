import React, {useEffect, useState} from 'react';
import { Form, Button, Input, Modal,  Select, Steps ,Checkbox,Row,Col} from 'antd';

import { TableListItem } from '../data.d';

import {queryOrganizationList, queryRoleList} from '../service';
import {forEach} from "lodash";
import {render} from "react-dom";

export interface FormValueTypeBind extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
  organization?: string;
}

export interface BindOrganizationProps {
  onCancel: (flag?: boolean, formVals?: FormValueTypeBind) => void;
  onSubmit: (values: FormValueTypeBind) => void;
  bindModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;


export interface BindOrganizationState {
  formVals: FormValueTypeBind;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const BindOrganization: React.FC<BindOrganizationProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueTypeBind>({
    id: props.values.id,
    organization:props.values.organization,
  });

  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleBindOrganizationModalVisible,
    bindOrganizationModalVisible,
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

    const roleList =  await queryOrganizationList()
    const elements: JSX.Element[] =[]
    roleList.forEach((item)=>{
      elements.push(
        <Select.Option key={item.id}
          value={item.id}
          style={{
            lineHeight: '32px',
          }}
        >
          {item.corporate_name}
        </Select.Option>
      );
    })
    return elements
  }

  const renderContent = () => {
      return (
        <FormItem name="organization" label="机构组织"
                  rules={[{required: true, message: '请设置用户的机构组织'}]}>
          <Select>
              {CheckBoxItemList}
          </Select>
        </FormItem>
      );

  };

  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handleBindOrganizationModalVisible(false, values)}>取消</Button>
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
      title="给用户配置机构组织"
      visible={bindOrganizationModalVisible}
      footer={renderFooter()}
      onCancel={() => handleBindOrganizationModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          organization:formVals.organization,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default BindOrganization;
