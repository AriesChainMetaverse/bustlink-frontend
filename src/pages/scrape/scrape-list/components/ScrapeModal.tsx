import type { FC} from 'react';
import React, { useEffect } from 'react';
import moment from 'moment';
import { Button, Divider, Form, Input, Modal, Result, Select, Space, Switch } from 'antd';
import type { ScrapeItem } from '../data.d';
import styles from '../style.less';

interface ScrapeModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<ScrapeItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ScrapeItem) => void;
  onCancel: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const ScrapeModal: FC<ScrapeModalProps> = (props) => {
  const [scrapeForm] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  const children: any[] = [];
  useEffect(() => {
    if (scrapeForm && !visible) {
      scrapeForm.resetFields();
    }
  }, [visible, scrapeForm]);

  useEffect(() => {
    if (current) {
      scrapeForm.setFieldsValue({
        ...current,
        createdAt: current.created_unix ? moment(current.created_unix) : null,
      });
    }
  }, [current, scrapeForm]);

  const handleSubmit = () => {
    if (!scrapeForm) return;
    scrapeForm.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as ScrapeItem);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalScrape = () => {
    if (done) {
      return (
        <Result
          status='success'
          title='操作成功'
          subTitle='任务添加成功，请进行其他操作。'
          extra={
            <Button type='primary' onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    current?.edges?.contents?.map((value) => {
      children.push(
        <Option value={value.id} key={'content_id'}>
          <Space split={<Divider type='vertical' />}>
            {value.from}
            {value.id}
          </Space>
        </Option>,
      );
      return false;
    });
    return (
      <Form {...formLayout} form={scrapeForm} onFinish={handleFinish}>
        <Form.Item name='id' hidden={true}>
          <Input placeholder='请输入' disabled={true} />
        </Form.Item>
        <Form.Item name='name' label='番号' rules={[{ required: true, message: '请输入番号名称' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='need_scrape'
          label='搜刮番号'
          valuePropName='checked'
          tooltip={'获取目标网站上的信息/图片，初始必须为true'}
        >
          <Switch
            checkedChildren='是'
            unCheckedChildren='否'
            defaultChecked={current === undefined ? true : current.need_scrape}
            checked={current === undefined ? true : current.need_scrape}
            disabled={current === undefined}
          />
        </Form.Item>
        <Form.Item
          name='force'
          label='强制'
          valuePropName='checked'
          tooltip={'强制获取会删除当前番号的所有信息包括图片，然后重新从目标网站上获取'}
        >
          <Switch checkedChildren='是' unCheckedChildren='否' checked={current?.force} />
        </Form.Item>
        <Form.Item name='check' label='资源检查' valuePropName='checked'>
          <Switch checkedChildren='是' unCheckedChildren='否' checked={current?.check} />
        </Form.Item>
        <Form.Item
          name='content_id'
          label='来源信息'
          valuePropName='value'
          tooltip={'上传文件时使用的目标来源信息'}
        >
          <Select>{children}</Select>
        </Form.Item>
        <Form.Item name='comment' label='备注' rules={[{ message: '请输入备注' }]}>
          <TextArea rows={4} placeholder='请输入' />
        </Form.Item>
      </Form>
    );
  };
  // <Image src='/api/v0/resource/${value.video_no}/image/poster.jpg'>${value.from}|${value.video_no}</Image>
  return (
    <Modal
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '28px 0' } : { padding: '12px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalScrape()}
    </Modal>
  );
};

export default ScrapeModal;
