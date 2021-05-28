import React, {FC, useEffect} from 'react';
import moment from 'moment';
import {Button,  Form, Input, Modal, Result} from 'antd';
import {InfoItem} from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<InfoItem> | undefined;
  onDone: () => void;
  onSubmit: (values: InfoItem) => void;
  onCancel: () => void;
}

const {TextArea} = Input;
const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const {done, visible, current, onDone, onCancel, onSubmit} = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.last_update ? moment(current.last_update) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as InfoItem);
    }
  };

  const modalFooter = done
    ? {footer: null, onCancel: onDone}
    : {okText: '保存', onOk: handleSubmit, onCancel};

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="Information编辑成功，请进行其他操作！"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item name='id' hidden={true}>
          <Input placeholder='请输入' disabled={true} />
        </Form.Item>
        <Form.Item
          name="video_no"
          label="番号"
          rules={[{required: true, message: '请输入番号'}]}
        >
          <Input placeholder="请输入" disabled={true}/>
        </Form.Item>

        <Form.Item
          name="title"
          label="视频简介"
          rules={[{required: true, message: '请视频简介'}]}
        >
          <TextArea rows={2} placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name="role"
          label="演员"
          rules={[{required: true, message: '请输入演员'}]}
        >
          <Input placeholder="请输入演员"/>
        </Form.Item>
        <Form.Item
          name="tags"
          label="标签"
          rules={[{required: true, message: '请输入标签'}]}
        >
          <Input placeholder="请输入标签，逗号隔开"/>
        </Form.Item>
        <Form.Item
          name="producer"
          label="制作公司"
          rules={[{required: true, message: '请输入制作公司'}]}
        >
          <Input placeholder="请输入制作公司"/>
        </Form.Item>
        <Form.Item
          name="publisher"
          label="发行方"
          rules={[{required: true, message: '请输入发行方'}]}
        >
          <Input placeholder="请输入发行方"/>
        </Form.Item>
        <Form.Item
          name="upload"
          label="上传"
          // rules={[{required: true, message: '请输入发行方'}]}
        >
          <Button>上传</Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      forceRender={true}
      title={done ? null : `Information${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? {padding: '72px 0'} : {padding: '28px 0 0'}}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
