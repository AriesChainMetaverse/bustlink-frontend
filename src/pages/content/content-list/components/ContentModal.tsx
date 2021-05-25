import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Button, Form, Input, Modal, Result, Select, Switch } from 'antd';
import { ContentItem } from '../data.d';
import styles from '../style.less';

interface ContentModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<ContentItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ContentItem) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const ContentModal: FC<ContentModalProps> = (props) => {
  const [contentForm] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (contentForm && !visible) {
      // contentForm.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      contentForm.setFieldsValue({
        ...current,
        updated_at: current.updated_at ? moment(current.updated_at) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!contentForm) return;
    contentForm.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as ContentItem);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
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
      <Form {...formLayout} form={contentForm} onFinish={handleFinish}>
        <Form.Item name="id" label="ID">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="from" label="来源" hidden={true}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="video_no"
          label="番号"
          rules={[{ required: true, message: '请输入番号名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="language"
          label="语言"
          rules={[{ required: true, message: '请选择目标语言' }]}
        >
          <Select placeholder="请选择">
            <Select.Option value="chs">简体中文</Select.Option>
            <Select.Option value="cht">繁体中文</Select.Option>
            <Select.Option value="en">英语</Select.Option>
            <Select.Option value="ja">日语</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="publisher" label="发行商" rules={[{ message: '请输入标题名称' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="studio" label="工作室" rules={[{ message: '请输入标题名称' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="movie_set" label="系列" rules={[{ message: '请输入标题名称' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="director" label="导演" rules={[{ message: '请输入标题名称' }]}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item name="plot" label="剧情">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="release_date" label="发行日">
          <Input />
        </Form.Item>
        <Form.Item name="uncensored" label="未经审查">
          <Switch checkedChildren="是" unCheckedChildren="否" checked={current?.uncensored} />
        </Form.Item>
        <Form.Item name="intro" label="简介" rules={[{ message: '请输入简介内容' }]}>
          <TextArea rows={4} placeholder="请输入" />
        </Form.Item>
        <Form.Item name="scrape_id" label="搜刮号">
          <Input placeholder="请输入" disabled={true} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      forceRender
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default ContentModal;
