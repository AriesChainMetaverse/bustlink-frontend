import React, {FC, useEffect, useState} from 'react';
import moment from 'moment';
import {Button, Form, Input, Modal, Result, Select} from 'antd';
import {InfoItem} from '../data.d';
import styles from '../style.less';
import {queryChannelList} from "@/pages/information/information-list/service";

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
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);

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

  useEffect(() => {
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const roleList =  await queryChannelList()
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

    roleList.forEach((item)=>{
      elements.push(
        <Select.Option key="{item.id}"
                       value={item.id}
                       style={{
                         lineHeight: '32px',
                       }}
        >
          {item.name}|{item.label}
        </Select.Option>
      );
    })

    return elements
  }




  const modalFooter = done
    ? {footer: null, onCancel: onDone}
    : {okText: '??????', onOk: handleSubmit, onCancel};

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="????????????"
          subTitle="Information???????????????????????????????????????"
          extra={
            <Button type="primary" onClick={onDone}>
              ?????????
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item name='id' hidden={true}>
          <Input placeholder='?????????' disabled={true} />
        </Form.Item>
        <Form.Item
          name="video_no"
          label="??????"
          rules={[{required: true, message: '???????????????'}]}
        >
          <Input placeholder="?????????" disabled={true}/>
        </Form.Item>

        <Form.Item
          name="title"
          label="????????????"
          rules={[{required: true, message: '???????????????'}]}
        >
          <TextArea rows={2} placeholder='?????????' />
        </Form.Item>
        <Form.Item
          name="role"
          label="??????"
          rules={[{required: true, message: '???????????????'}]}
        >
          <Input placeholder="???????????????"/>
        </Form.Item>
        <Form.Item
          name="tags"
          label="??????"
          rules={[{required: true, message: '???????????????'}]}
        >
          <Input placeholder="??????????????????????????????"/>
        </Form.Item>
        <Form.Item
          name="producer"
          label="????????????"
          rules={[{required: true, message: '?????????????????????'}]}
        >
          <Input placeholder="?????????????????????"/>
        </Form.Item>
        <Form.Item
          name="publisher"
          label="?????????"
          rules={[{required: true, message: '??????????????????'}]}
        >
          <Input placeholder="??????????????????"/>
        </Form.Item>
        <Form.Item name="channel_id" label="??????">
          <Select>
            {CheckBoxItemList}
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      forceRender={true}
      title={done ? null : `Information${current ? '??????' : '??????'}`}
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
