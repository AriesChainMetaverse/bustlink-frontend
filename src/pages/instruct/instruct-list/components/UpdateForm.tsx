import React, {useEffect, useState} from 'react';
import {Form, Button, Input, Modal, Select, Checkbox, Row,} from 'antd';

import { TableListItem } from '../data.d';
import {queryAdminNoteList} from "@/pages/instruct/instruct-list/service";

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
    title: props.values.title,
    action:props.values.action,
    information_id:props.values.information_id,
    type:props.values.type,
    // nodes:props.values.nodes,
    // pid:props.values.nodes,
    rid:props.values.rid,
  });

  const [form] = Form.useForm();
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);
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

    // if (currentStep < 1) {
    //   forward();
    // } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    // }
  };

  useEffect(() => {
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const nodeList =  await queryAdminNoteList()
    const elements: JSX.Element[] =[]
    nodeList.forEach((item)=>{
      elements.push(
        <Checkbox key={item.id}
                  value={item.id}
                  style={{
                    lineHeight: '32px',
                  }}
        >
          {item.pid}
        </Checkbox>
      );
    })
    return elements
  }


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
        <FormItem
          name="title"
          label="标题"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem name="action" label="PIN状态">
          <Select style={{ width: '100%' }}>
            <Option value="none">none</Option>
            <Option value="pin">pin</Option>
            <Option value="unpin">unpin</Option>
          </Select>
        </FormItem>
        <FormItem name="nodes" label="PID"
                  rules={[{required: true, message: '请设置PID'}]}>
          <Checkbox.Group>
            <Row>
              {CheckBoxItemList}
            </Row>
          </Checkbox.Group>
        </FormItem>

      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );

  };

  return (
    <Modal
      width={840}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="视频资源PIN配置"
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
          title:formVals.title,
          action:formVals.action,
          nodes:formVals.nodes,
          rid:formVals.rid,
          type:formVals.type,
          information_id:formVals.information_id,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
