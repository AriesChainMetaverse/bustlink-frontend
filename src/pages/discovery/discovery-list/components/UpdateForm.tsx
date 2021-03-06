import React, { useState,Component  } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col} from 'antd';

import Editor from 'for-editor';
import moment from 'moment';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  title?: string;
  content?: string;
  kind?: string;
  link?: string;
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

    id: props.values.id,
    title: props.values.title,
    detail: props.values.detail,
    mtype: props.values.mtype,
    links: props.values.links,
    date:moment(props.values.date),
    publish: props.values.publish,
    rid: props.values.rid,
  });

  const [needRequired, setNeedRequired] = useState<boolean>(props.values.mtype!=="none");

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

  // const vm = React.createRef()

  // const addImg = (file)=> {
  //   vm.current.$img2Url(file.name, 'file_url')
  //   console.log(file)
  // }

  function handleChange(value) {
      if (value === "none"){
        setNeedRequired(false) ;
      }else{
        setNeedRequired(true) ;
      }
  }

  // const handleChange = e => {
  //   if (e.target.value === "none"){
  //     setNeedRequired(false) ;
  //   }else{
  //     setNeedRequired(true) ;
  //   }
  // };


  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="?????????" disabled={true}/>
        </FormItem>
        <FormItem
          name="date"
          label="??????"
        >
          <DatePicker placeholder="???????????????"/>
        </FormItem>
        <FormItem
          name="title"
          label="??????"
          rules={[{ required: true, message: '???????????????????????????????????????', min: 2 }]}
        >
          <TextArea rows={4} placeholder="???????????????????????????" />
        </FormItem>
        <FormItem
          name="rid"
          label="RID"
        >
          <Input placeholder="?????????" />
        </FormItem>
        <FormItem name="mtype" label="??????">
          <Select style={{ width: '100%' }} onChange={handleChange}>
            <Option value="none">none</Option>
            <Option value="video">video</Option>
            <Option value="photo">photo</Option>
            <Option value="both">both</Option>

          </Select>
        </FormItem>
        <FormItem
          name="links"
          label="??????"
          rules={[{ required: needRequired, message: '??????????????????' }]}

        >
          <TextArea rows={4} placeholder="both???????????????????????????????????????,??????,????????????video???????????????photo" />
        </FormItem>
        <FormItem
          name="detail"
          label="????????????"
          rules={[{ required: true, message: '???????????????????????????????????????', min: 5 }]}
        >
          <Editor />
        </FormItem>

        <FormItem name="publish" label="????????????">
          <RadioGroup style={{ width: '100%' }} >
            <Radio value={false} >???</Radio>
            <Radio value={true}>???</Radio>
          </RadioGroup>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
          <Button type="primary" onClick={() => handleNext()}>
            ??????
          </Button>
        </>
      );
    // }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         ?????????
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         ??????
    //       </Button>
    //     </>
    //   );
    // }
    // return (
    //   <>
    //     <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
    //     <Button type="primary" onClick={() => handleNext()}>
    //       ?????????
    //     </Button>
    //   </>
    // );
  };

  return (
    <Modal
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="??????????????????"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          title: formVals.title,
          detail: formVals.detail,
          mtype: formVals.mtype,
          links: formVals.links,
          date:formVals.date,
          publish: formVals.publish,
          rid: formVals.rid,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
