import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps ,Checkbox,Row,Col,Upload, Icon} from 'antd';


import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: string;

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
  // @ts-ignore
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    is_verify: props.values.is_verify ? "1" :"0",
    corporate_hash: props.values.corporate_hash,
    corporate_name: props.values.corporate_name,
    corporate_legal_user: props.values.corporate_legal_user,
    corporate_id_card_facade: props.values.corporate_id_card_facade,
    corporate_id_card_obverse: props.values.corporate_id_card_obverse,
    corporate_code: props.values.corporate_code,
    business_license: props.values.business_license,
    comment: props.values.comment,
    file_list: props.values.file_list,
  });

  // const [currentStep, setCurrentStep] = useState<number>(0);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  const handleChange= (info) => {

    let fileList = info.fileList;

    fileList = fileList.slice(-2);
    console.log('fileList:', fileList);

    setFormVals({
      business_license: "",
      comment: "",
      content: "",
      corporate_code: "",
      corporate_hash: "",
      corporate_id_card_facade: "",
      corporate_id_card_obverse: "",
      corporate_legal_user: "",
      corporate_name: "",
      data_scope: "",
      flag: "",
      id: "",
      is_verify: "",
      key: 0,
      name: "",
      sort: 0,
      status: 0,
      title: "",
      file_list:fileList})

  };

  const beforeUpload = ({fileList}) => {
    return  false;
  }

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
  const upload_props = {
    // action: '/upload.do',
    onChange: handleChange,
    multiple: false,
    beforeUpload
  };



  const renderContent = () => {
    // @ts-ignore
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="corporate_name"
          label="企业名称"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}

        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="corporate_hash"
          label="法人资料存放目录"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="corporate_legal_user"
          label="企业法人"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="corporate_id_card_facade"
          label="法人身份证(正)"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="corporate_id_card_obverse"
          label="法人身份证(反)"
        >
          <TextArea rows={4} placeholder="请输入至少两个字符" />
        </FormItem>
        <FormItem
          name="corporate_code"
          label="社会统一信用代码"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="business_license"
          label="营业执照"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          label="营业执照"
          name="business_license"
          help="营业执照"
          getValueFromEvent={normFile}
        >
          <Upload {...upload_props} name="business_license"
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>

        </FormItem>

        <FormItem
          name="comment"
          label="备注"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem name="is_verify" label="验证状态"
        >
          <Select style={{ width: '100%' }}>
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
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
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="组织信息配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{

          id: formVals.id,
          is_verify: formVals.is_verify,
          corporate_hash: formVals.corporate_hash,
          corporate_name: formVals.corporate_name,
          corporate_legal_user: formVals.corporate_legal_user,
          corporate_id_card_facade: formVals.corporate_id_card_facade,
          corporate_id_card_obverse: formVals.corporate_id_card_obverse,
          corporate_code: formVals.corporate_code,
          business_license: formVals.business_license,
          comment: formVals.comment,
          file_list: formVals.file_list,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
