import React, { useEffect, useState } from 'react';
import { Button, Card, Image, List, message, Modal, Pagination, Space } from 'antd';
import { queryChannelInfos, removeAllChannelInfos, removeChannelInfos } from '@/pages/channel/service';
import { InfoItem, InfoListItemDataType } from '@/pages/information/information-list/data';
import { DeleteOutlined } from '@ant-design/icons';

interface EditInfoFormProps {
  id: number;
  editModalVisible: boolean;
  onCancel: () => void;
}

const EditInfoForm: React.FC<EditInfoFormProps> = (props) => {
  const { editModalVisible, onCancel } = props;
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [infoItems, setInfoItems] = useState<InfoListItemDataType>();
  const { id } = props;


  async function getChannelInfos() {
    if (id === 0) {
      return undefined;
    }
    const resp = await queryChannelInfos({ page, per_page: perPage, id });
    console.log(resp);
    return resp;
  }

  function handleClearChannelInfos(id: number) {
    Modal.info({
      content: `是否从频道${id}清除所有视频`,
      okText: '确认',
      onOk: async () => {
        const resp = await removeAllChannelInfos({ id });
        if (resp.status == 'success') {
          message.success(resp.message);
          setPage(1);
          onCancel();
        }
      },
    });
  }

  function handleDeleteChannelInfos(id: number, info: InfoItem) {
    Modal.info({
      content: `是否从频道${id}删除${info.video_no}`,
      onOk: async () => {
        const resp = await removeChannelInfos({ id, infoIDs: [info.id] });
        if (resp.status == 'success') {
          message.success(resp.message);
          getChannelInfos().then(r => setInfoItems(r));
        }
      },
    });
  }

  useEffect(() => {
    getChannelInfos().then(r => setInfoItems(r));
  }, [id, page, perPage]);

  const onChange = async (newPage: number, pageSize?: number) => {
    pageSize = pageSize === undefined ? perPage : pageSize;
    setPerPage(pageSize);
    setPage(newPage);
  };
  // getChannelInfos();
  return (
    <Modal
      destroyOnClose
      width={800}
      title='媒体编辑'
      visible={editModalVisible}
      onCancel={() => {
        setPage(1);
        onCancel();
      }}
      footer={<Pagination
        key={'pagination'}
        total={infoItems?.total}
        current={infoItems?.current_page}
        onChange={onChange}
        defaultPageSize={perPage}
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />}
    >
      <List
        header={<Button onClick={() => {
          handleClearChannelInfos(id);
        }}><DeleteOutlined />清空</Button>}
        grid={{ gutter: 0, column: perPage }}
        itemLayout={'vertical'}
        dataSource={infoItems === undefined ? undefined : infoItems.data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.video_no}
                  actions={[
                    <DeleteOutlined key='delete' onClick={() => {
                      handleDeleteChannelInfos(id, item);
                    }} />,
                  ]}
                  cover={<Image
                    width='100%'
                    src={`http://127.0.0.1:18080/link/${item.root}/${item.thumb_path}`} />}
            >
              <Space>{item.sharpness}{item.language}</Space>
            </Card>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default EditInfoForm;
