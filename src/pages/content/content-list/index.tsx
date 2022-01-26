import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  Input,
  List,
  Modal,
  Pagination,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import type { ContentItem, ContentItemEdges } from './data.d';
import styles from './style.less';
import { removeContent, updateContent,createContent } from '@/pages/content/content-list/service';
import { findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { DeleteOutlined, EditOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import ContentModal from '@/pages/content/content-list/components/ContentModal';

const { Paragraph } = Typography;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const Languages = [
  { key: 'cht', val: '繁体中文' },
  { key: 'chs', val: '简体中文' },
  { key: 'en', val: '英语' },
  { key: 'ja', val: '日语' },
];

interface BasicListProps {
  listAndContentList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

// const Info: FC<{
//   title: React.ReactNode;
//   value: React.ReactNode;
//   bordered?: boolean;
// }> = ({ title, value, bordered }) => (
//   <div className={styles.headerInfo}>
//     <span>{title}</span>
//     <p>{value}</p>
//     {bordered && <em />}
//   </div>
// );

const ContentEdges = ({ data: { actors, genres } }: { data: ContentItemEdges }) => (
  <div className={styles.listContentItem}>
    {
      <div className={'content_edges'}>
        <strong>演员: </strong>
        <b>
          <Space split={<Divider type="vertical" />} size={[8, 0]} wrap>
            {actors?.map((actor) => (
              <a key={'actor_name'}>{actor.name}</a>
            ))}
          </Space>
        </b>
        <p />
        <strong>标签: </strong>
        <b>
          <Space split={<Divider type="vertical" />} size={[8, 0]} wrap>
            {genres?.map((genre) => (
              <a key={'genre_content'}>{genre.content}</a>
            ))}
          </Space>
        </b>
      </div>
    }
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndContentList: { list },
  } = props;

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [contentDone, setContentDone] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [contentCurrent, setContentCurrent] = useState<Partial<ContentItem> | undefined>(undefined);
  // const [scrapeDone, setScrapeDone] = useState<boolean>(false);
  // const [scrapeVisible, setScrapeVisible] = useState<boolean>(false);
  // const [scrapeCurrent, setScrapeCurrent] = useState<Partial<ScrapeMember> | undefined>(undefined);
  const showEditModal = (item: ContentItem) => {
    const newItem = { ...item };
    if (item.id !== '') {
      setContentVisible(true);
      setContentCurrent(newItem);
    }
  };

  const deleteItem = async (item: ContentItem) => {
    Modal.confirm({
      title: '删除确认',
      content: `是否确定删除番号：${item.video_no}?`,
      onOk: async () => {
        const resp = await removeContent({ id: item.id });
        if (resp.status === 'success') {
          Modal.success({
            content: resp.message,
          });
          dispatch({
            type: 'listAndContentList/fetch',
            payload: {
              page,
              per_page: perPage,
            },
          });
        }
      },
    });
  };

  const IconText = ({ icon, text, item, action }: any) => (
    <Space>
      <label
        onClick={async (e: any) => {
          if (action === 'delete') {
            await deleteItem(item);
          } else if (action === 'edit') {
            await showEditModal(item);
          }
        }}
      >
        {React.createElement(icon)} {text}
      </label>
    </Space>
  );

  useEffect(() => {
    dispatch({
      type: 'listAndContentList/fetch',
      payload: {
        page,
        per_page: perPage,
      },
    });
  }, [dispatch, page, perPage]);

  // const paginationProps = {
  //   showSizeChanger: true,
  //   showQuickJumper: true,
  //   pageSize: 5,
  //   total: 50,
  // };

  const showModal = () => {
    setContentVisible(true);
    setContentCurrent(undefined);
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">等待中</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleContentDone = () => {
    setAddBtnblur();
    setContentDone(false);
    setContentVisible(false);
  };

  const handleContentCancel = () => {
    setAddBtnblur();
    setContentVisible(false);
  };

  const handleContentSubmit = async (values: ContentItem) => {
    setAddBtnblur();
    if (values.id) {
      const resp = await updateContent(values);
      if (resp.status === 'success') {
        Modal.success({
          content: resp.message,
          onOk: () => {
            setContentVisible(false);
          },
        });
        dispatch({
          type: 'listAndContentList/fetch',
          payload: {
            page,
            per_page: perPage,
          },
        });
      } else {
        Modal.error({
          content: resp.message,
        });
      }
    }else{
      const resp = await createContent(values);
      if (resp.status === 'success') {
        Modal.success({
          content: resp.message,
          onOk: () => {
            setContentVisible(false);
          },
        });
        dispatch({
          type: 'listAndContentList/fetch',
          payload: {
            page,
            per_page: perPage,
          },
        });
      } else {
        Modal.error({
          content: resp.message,
        });
      }

    }
  };

  const onChange = (newPage: number, pageSize?: number) => {
    setPerPage(pageSize === undefined ? 15 : pageSize);
    setPage(newPage);
  };

  const footer = [
    <Pagination
      key={'pagination'}
      total={list?.total}
      current={list?.current_page}
      onChange={onChange}
      defaultPageSize={perPage}
      pageSizeOptions={['15', '30', '60', '120', '250', '500']}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
    />,
  ];

  return (
    <div>
      <PageContainer footer={footer}>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '5px 32px 40px 32px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
            </Button>

            <List
              itemLayout="vertical"
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={list == null ? [] : list.data}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={
                    <Card className={'content_detail'} style={{ width: 450 }} size={'small'}>
                      <Row>
                        <Col span={12}>
                          <p>
                            <strong>来源: </strong>
                            <b className="content_from">{item.from}</b>
                          </p>
                        </Col>
                        <Col span={12}>
                          <p>
                            <strong>语言: </strong>
                            <b className="content_language">
                              {
                                Languages.filter((language) => {
                                  if (language.key === item.language) {
                                    return true;
                                  }
                                  return false;
                                })[0]?.val
                              }
                            </b>
                          </p>
                        </Col>
                        <Col span={12}>
                          <p>
                            <strong>工作室: </strong>
                            <b className="content_studio">{item.studio}</b>
                          </p>
                        </Col>
                        <Col span={12}>
                          <p>
                            <strong>发行商: </strong>
                            <b className="content_publisher">{item?.publisher}</b>
                          </p>
                        </Col>

                        <Col span={12}>
                          <p>
                            <strong>发行日: </strong>
                            <b className="content_year">{`${item.release_date}`}</b>
                          </p>
                        </Col>
                        <Col span={24}>
                          <p>
                            <strong>系列: </strong>
                            <b className="content_movie_set">{item?.movie_set}</b>
                          </p>
                        </Col>
                      </Row>
                      <ContentEdges data={item.edges} />
                    </Card>
                  }
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="收藏"
                      key="star"
                      action={'star'}
                      item={item}
                    />,
                    <IconText
                      icon={EditOutlined}
                      text="编辑"
                      key="edit"
                      action={'edit'}
                      item={item}
                    />,
                    <IconText
                      icon={DeleteOutlined}
                      text="删除"
                      key="delete"
                      action={'delete'}
                      item={item}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={`/api/v0/resource/${item.video_no}/image/thumb.jpg`}
                        fallback="/api/v0/resource/failed/147x200.svg"
                        width="72px"
                      />
                    }
                    title={<a href="">{item.video_no}</a>}
                    description={
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                          expandable: true,
                          symbol: '展开',
                        }}
                      >
                        {item.title}
                      </Paragraph>
                    }
                  />

                  <List.Item.Meta
                    title={'简介'}
                    description={
                      <Paragraph
                        ellipsis={{
                          rows: 3,
                          expandable: true,
                          symbol: '展开',
                        }}
                      >
                        {item.intro === undefined ? 'N/A' : item.intro}
                      </Paragraph>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>

      <ContentModal
        done={contentDone}
        current={contentCurrent}
        visible={contentVisible}
        onDone={handleContentDone}
        onCancel={handleContentCancel}
        onSubmit={handleContentSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    listAndContentList,
    loading,
  }: {
    listAndContentList: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    listAndContentList,
    loading: loading.models.listAndContentList,
  }),
)(BasicList);
