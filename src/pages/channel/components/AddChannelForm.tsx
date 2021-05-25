import React from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';

import type { ChannelItem } from '../data.d';

export interface ChannelFormValueType extends Partial<ChannelItem> {}

export interface UpdateChannelFormProps {
  onCancel: (flag?: boolean, formVals?: ChannelFormValueType) => void;
  onSubmit: (values: ChannelFormValueType) => void;
  addModalVisible: boolean;
}

const ChannelFormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const AddChannelForm: React.FC<UpdateChannelFormProps> = (props) => {
  const [form] = Form.useForm();
  const {
    onSubmit: handleChannelAddSubmit,
    onCancel: handleAddModalVisible,
    addModalVisible,
  } = props;

  const channelName = [
    {
      value: 'default',
      text: '默认',
    },
    {
      value: 'free',
      text: '免费',
    },
    {
      value: 'vip',
      text: '会员',
    },
    {
      value: 'spread',
      text: '运营',
    },
    {
      value: 'custom',
      text: '自定义',
    },
  ];

  const renderContent = () => {
    return (
      <>
        <ChannelFormItem
          name={'name'}
          label="频道名称"
          rules={[{ required: true, message: '请输入番号名称！' }]}
        >
          <Select key={'channel_name'}>
            {channelName.map((v) => {
              return <Option value={v.value}>{v.text}</Option>;
            })}
          </Select>
        </ChannelFormItem>
        <ChannelFormItem name={'label'} label="频道标签">
          <Input placeholder="请输入" />
        </ChannelFormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleAddModalVisible(false, form.getFieldsValue())}>取消</Button>
        <Button type="primary" onClick={() => handleChannelAddSubmit(form.getFieldsValue())}>
          添加
        </Button>
      </>
    );
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="添加频道"
      visible={addModalVisible}
      footer={renderFooter()}
      onCancel={() => handleAddModalVisible()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddChannelForm;
