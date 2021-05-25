import React from 'react';
import { Card, List, Modal } from 'antd';

interface EditInfoFormProps {
  editModalVisible: boolean;
  onCancel: () => void;
}

const EditInfoForm: React.FC<EditInfoFormProps> = (props) => {
  const { editModalVisible, onCancel } = props;
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={editModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default EditInfoForm;
