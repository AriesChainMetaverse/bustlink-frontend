import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row, Select, Steps} from 'antd';

import {TableListItem} from '../data.d';
import {FormattedMessage, useIntl} from "umi";
import {queryOrganizationList} from "@/pages/sysuser/sysuser-list/service";
import {queryPageList} from "@/pages/top/top-list/service";

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
const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;


export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  /**
   * 国际化配置
   */
  const intl = useIntl();

  const [formVals, setFormVals] = useState<FormValueType>({

    video_no: props.values.video_no,
    id: props.values.id,
    intro: props.values.intro,
    lower_banner: props.values.lower_banner,
    title: props.values.title,
    top_right: props.values.top_right,
    category: props.values.category,
    page_id: props.values.page_id,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [CheckBoxItemList, setCheckBoxItemList] = useState<[]>([]);
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({...formVals, ...fieldsValue});

    if (currentStep < 1) {
      forward();
    } else {
      handleUpdate({...formVals, ...fieldsValue});
    }
  };


  useEffect(() => {
    getCheckboxItemList().then(r => setCheckBoxItemList(r));
  }, []);

  async function getCheckboxItemList() {

    const roleList =  await queryPageList()
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
          {item.title}
        </Select.Option>
      );
    })

    return elements
  }


  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="category" label={intl.formatMessage({
            id: 'pages.toplist.indexForm.category',
            defaultMessage: '分类',
          })}
                    rules={[{
                      required: true, message: <FormattedMessage
                        id='pages.toplist.indexForm.ruleRequired'
                        defaultMessage='请设置视频资源属性！'
                      />
                    }]}>
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="newest"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_newest',
                      defaultMessage: '最新上架',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="top"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_top',
                      defaultMessage: '置顶',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="special"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_special',
                      defaultMessage: '推荐',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="hottest"
                    style={{
                      lineHeight: '32px',
                    }}

                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_hottest',
                      defaultMessage: '人气最高',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="star"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_star',
                      defaultMessage: '明星',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="producer"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_producer',
                      defaultMessage: '制作公司',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="exclusive"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_exclusive',
                      defaultMessage: '独家内容',
                    })}

                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="normal"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    {intl.formatMessage({
                      id: 'pages.toplist.indexForm.category_normal',
                      defaultMessage: '正常',
                    })}

                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </FormItem>
          <FormItem name="lower_banner"
                    label={intl.formatMessage({
                      id: 'pages.toplist.indexForm.lower',
                      defaultMessage: '底标',
                    })}
          >
            <Select style={{width: '100%'}}>
              <Option value="free">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_free',
                  defaultMessage: '免费',
                })}
              </Option>
              <Option value="discount">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_discount',
                  defaultMessage: '折扣',
                })}
              </Option>
              <Option value="event">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_event',
                  defaultMessage: '限免',
                })}

              </Option>
              <Option value="premium">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_premium',
                  defaultMessage: '精品',
                })}

              </Option>
              <Option value="collection">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_collection',
                  defaultMessage: '收藏',
                })}

              </Option>
              <Option value="liked">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_liked',
                  defaultMessage: '喜欢',
                })}

              </Option>
              <Option value="none">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_none',
                  defaultMessage: '无',
                })}

              </Option>
            </Select>
          </FormItem>
          <FormItem name="top_right"
                    label={intl.formatMessage({
                      id: 'pages.toplist.indexForm.topright',
                      defaultMessage: '右上角标',
                    })}
          >
            <Select style={{width: '100%'}}>
              <Option value="free">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_free',
                  defaultMessage: '免费',
                })}
              </Option>
              <Option value="discount">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_discount',
                  defaultMessage: '折扣',
                })}
              </Option>
              <Option value="event">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_event',
                  defaultMessage: '限免',
                })}

              </Option>
              <Option value="premium">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_premium',
                  defaultMessage: '精品',
                })}

              </Option>
              <Option value="collection">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_collection',
                  defaultMessage: '收藏',
                })}

              </Option>
              <Option value="liked">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_liked',
                  defaultMessage: '喜欢',
                })}

              </Option>
              <Option value="none">
                {intl.formatMessage({
                  id: 'pages.toplist.indexForm.corner_none',
                  defaultMessage: '无',
                })}

              </Option>
            </Select>
          </FormItem>
          <FormItem name="page_id" label="页面">
            <Select>
              {CheckBoxItemList}
            </Select>
          </FormItem>
        </>
      );
    }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <FormItem
    //         name="time"
    //         label="开始时间"
    //         rules={[{ required: true, message: '请选择开始时间！' }]}
    //       >
    //         <DatePicker
    //           style={{ width: '100%' }}
    //           showTime
    //           format="YYYY-MM-DD HH:mm:ss"
    //           placeholder="选择开始时间"
    //         />
    //       </FormItem>
    //       <FormItem name="frequency" label="调度周期">
    //         <Select style={{ width: '100%' }}>
    //           <Option value="month">月</Option>
    //           <Option value="week">周</Option>
    //         </Select>
    //       </FormItem>
    //     </>
    //   );
    // }
    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="video_no"
          label={intl.formatMessage({
            id: 'pages.toplist.indexForm.video_no',
            defaultMessage: '番号',
          })}
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="title"
          label={intl.formatMessage({
            id: 'pages.toplist.indexForm.title',
            defaultMessage: '标题',
          })}
        >
          <Input placeholder="请输入"/>
        </FormItem>
        <FormItem
          name="intro"
          label={intl.formatMessage({
            id: 'pages.toplist.indexForm.intro',
            defaultMessage: '视频简介',
          })}
          rules={[{
            required: true, message: <FormattedMessage
              id='pages.toplist.indexForm.ruleRequiredMin5'
              defaultMessage='请输入至少五个字符的描述！'
            />, min: 5
          }]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({
            id: 'pages.toplist.indexForm.ruleRequiredMin5',
            defaultMessage: '请输入至少五个字符的描述',
          })}/>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{float: 'left'}} onClick={backward}>
            {intl.formatMessage({
              id: 'pages.previous',
              defaultMessage: '上一步',
            })}
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>
            {intl.formatMessage({
              id: 'pages.cancel',
              defaultMessage: '取消',
            })}
          </Button>
          <Button type="primary" onClick={() => handleNext()}>
            {intl.formatMessage({
              id: 'pages.submit',
              defaultMessage: '完成',
            })}
          </Button>
        </>
      );
    }
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
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>
          {intl.formatMessage({
            id: 'pages.cancel',
            defaultMessage: '取消',
          })}
        </Button>
        <Button type="primary" onClick={() => handleNext()}>
          {intl.formatMessage({
            id: 'pages.next',
            defaultMessage: '下一步',
          })}
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.toplist.updateForm.home',
        defaultMessage: '设置首页资源列表',
      })}
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{marginBottom: 28}} size="small" current={currentStep}>
        <Step title={intl.formatMessage({
          id: 'pages.toplist.updateForm.baseinfor',
          defaultMessage: '基本信息',
        })}/>
        <Step title={intl.formatMessage({
          id: 'pages.toplist.updateForm.setcatagory',
          defaultMessage: '配置分类',
        })}/>
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          video_no: formVals.video_no,
          id: formVals.id,
          intro: formVals.intro,
          lower_banner: formVals.lower_banner,
          title: formVals.title,
          top_right: formVals.top_right,
          category: formVals.category,
          page_id: formVals.page_id,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
