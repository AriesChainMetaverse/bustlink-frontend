import React, {useState} from 'react';
import {Input, Modal, Radio, Form, Select, Button, Upload, DatePicker} from 'antd';
import Editor from "for-editor";
import {TableListItem} from "@/pages/update/update-list/data";
import {FormValueType, UpdateFormProps} from "@/pages/update/update-list/components/UpdateForm";
import {CloudUploadOutlined} from "@ant-design/icons";
import {array} from "prop-types";

interface CreateFormProps {
  // modalVisible: boolean;
  // onCancel: () => void;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const FormItem = Form.Item;
const { TextArea } = Input;
const CreateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [formVals, setFormVals] = useState<FormValueType>({

    mtype: "",
    date: "",
    links: "",
    title: "",
    detail: "",
    rid: "",


  });
  const [needRequired, setNeedRequired] = useState<boolean>(false);

  const {
    onSubmit: handleCreate,
    onCancel: handleModalVisible,
    values,
    // fileList,
    // showUploadList: false,
    // beforeUpload:handleBeforeUpload,



  } = props;

  const [form] = Form.useForm();

  // const beforeUploadHandle= (file) =>{
  //   console.log(file)
  //   setExefile(file)
  //   form.setFieldsValue({"exeFile":file})
  //   return false;
  // }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals(form.getFieldsValue());
    handleCreate({ ...formVals, ...fieldsValue });
  };
  function handleChange(value) {
    if (value === "none"){
      setNeedRequired(false) ;
    }else{
      setNeedRequired(true) ;
    }
  }

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <TextArea rows={2} placeholder="请输入至少两个字符" />
        </FormItem>
        <FormItem
          name="mtype"
          label="分类"
          rules={[{ required: true, message: '请设置！', min: 2 }]}
        >
          <Select style={{ width: '100%' }} onChange={handleChange}>
            <Option value="none">none</Option>
            <Option value="video">video</Option>
            <Option value="photo">photo</Option>
            <Option value="both">both</Option>
          </Select>
        </FormItem>
        <FormItem
          name="links"
          label="链接"
          rules={[{ required: needRequired, message: '请输入链接！' }]}
        >
          <TextArea rows={2} placeholder="both的情况请输入两个链接，请用,间隔,前一个是video，后一个是photo" />
        </FormItem>
        <FormItem
          name="rid"
          label="RID"
          rules={[{ required: false, message: '关联资源的rid！', min: 2 }]}
        >
          <TextArea rows={1} placeholder="关联资源的rid" />
        </FormItem>
        <FormItem
          name="date"
          label="日期"
          rules={[{ required: true, message: '请设置！' }]}
        >
          <DatePicker
            showTime format="yyyy/MM/DD HH:mm:ss" placeholder="请选择时间"
          />
        </FormItem>

        <FormItem
          name="detail"
          label="内容"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <Editor />
        </FormItem>


      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    return (
      <>
        <Button onClick={() => handleModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  }
  return (
    <Modal
      width={1000}
      destroyOnClose
      title="新建发现页面"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        {...formLayout}
        form={form}

      >
        {renderContent()}
        {renderFooter()}
      </Form>



    </Modal>
  );
};

export default CreateForm;
