import React, { useState } from 'react';
import { Form, Button, Input, Modal, Space, Divider, TreeSelect } from 'antd';

import type { ChannelItem } from '../data.d';
import { queryChannelAddInfos } from '@/pages/channel/service';

const { SHOW_CHILD } = TreeSelect;

export interface InfoFormValueType extends Partial<ChannelItem> {
  infoIDs?: string[];
}

export interface UpdateChannelInfoFormProps {
  onCancel: (flag?: boolean, formVals?: InfoFormValueType) => void;
  onSubmit: (values: InfoFormValueType) => void;
  addModalVisible: boolean;
  values: Partial<ChannelItem>;
}

const ChannelFormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const AddInfoForm: React.FC<UpdateChannelInfoFormProps> = (props) => {
  const [formVals, setFormVals] = useState<InfoFormValueType>({
    id: props.values.id,
    infoIDs: [],
  });

  const [infoTreeData, setInfoTreeData] = useState<{
    value?: string[];
    treeData: { title: any; value: any; key: any; id: string; children?: any[] }[];
  }>({ value: undefined, treeData: [] });
  const [form] = Form.useForm();
  const {
    onSubmit: handleInfoAdd,
    onCancel: handleUpdateModalVisible,
    addModalVisible,
    values,
  } = props;

  function onSelectChange(value: string[]) {
    setFormVals({ id: formVals.id, infoIDs: value });
    setInfoTreeData({ value, treeData: infoTreeData.treeData });
  }

  function onInfoLoad() {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  async function queryInfo() {
    let videono = form.getFieldValue('video_no');
    const resp = await queryChannelAddInfos({ id: formVals.id, video_no: videono, per_page: 500 });
    const child: {
      pId: string;
      title: any;
      value: any;
      key: any;
      id: string;
      children?: [];
    }[] = [];
    let parent;
    if (resp.total > 0) {
      if ((videono === undefined) || videono === '') {
        videono = 'ALL';
      }

      resp.data.forEach((v: any) => {
        child.push({
          id: v.id,
          title: (
            <Space split={<Divider type='vertical' />} size={[8, 0]} wrap>
              {v.video_no.toUpperCase()}
              {v.language.toUpperCase()}
              {v.sharpness.toUpperCase()}
            </Space>
          ),
          pId: videono,
          key: v.id,
          value: v.id,
        });
      });
      parent = infoTreeData.treeData.concat({
        id: videono,
        title: videono,
        key: videono,
        value: videono,
        children: child,
      });
      setInfoTreeData({
        value: infoTreeData.value,
        treeData: parent,
      });
      // }
    }
  }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleInfoAdd({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <ChannelFormItem
          name={'video_no'}
          label='????????????'
          // rules={[{ required: true, message: '????????????????????????' }]}
        >
          <Space>
            <Input placeholder='?????????' />
            <Button onClick={queryInfo}>??????</Button>
          </Space>
        </ChannelFormItem>
        <ChannelFormItem name={'information_ids'} label='????????????'>
          <TreeSelect
            treeData={infoTreeData.treeData}
            value={infoTreeData.value}
            onChange={onSelectChange}
            treeCheckable={true}
            showCheckedStrategy={SHOW_CHILD}
            placeholder={'Please select'}
            loadData={onInfoLoad}
          />
        </ChannelFormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
        <Button type='primary' onClick={() => handleNext()}>
          ??????
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={800}
      bodyStyle={{ padding: '32px 0px 0px' }}
      destroyOnClose
      title='????????????'
      visible={addModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          name: formVals.name,
          label: formVals.label,
          created_unix: formVals.created_unix,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddInfoForm;
