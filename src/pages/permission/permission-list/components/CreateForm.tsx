import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      width={1000}
      destroyOnClose
      title="新建公告通知"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;