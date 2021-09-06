import React, {useEffect, useState} from 'react';
import { Form, Button,  Modal,  Checkbox,Row,} from 'antd';

import { TableListItem } from '../data.d';

import { queryMenuList} from '../service';


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
    menus:props.values.menus,
  });

  // const [currentStep, setCurrentStep] = useState<number>(0);
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
    // @ts-ignore
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const menunList =  await queryMenuList()
    const elements: JSX.Element[] =[]
    menunList.forEach((item: { id: React.Key | null | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; })=>{
      elements.push(
        <Checkbox key={item.id}
          value={item.id}
          style={{
            lineHeight: '32px',
          }}
        >
          {item.name}
        </Checkbox>
      );
    })
    return elements
  }

  const renderContent = () => {
      return (
        <FormItem name="menus" label="菜单"
                  rules={[{required: true, message: '请设置权限的菜单'}]}>
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
      title="给权限分配菜单"
      visible={bindModalVisible}
      footer={renderFooter()}
      onCancel={() => handlebindModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          menus:formVals.menus,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default BindForm;
