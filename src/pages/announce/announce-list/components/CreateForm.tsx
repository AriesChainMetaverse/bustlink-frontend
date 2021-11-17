import React from 'react';
import { Modal } from 'antd';
import {useIntl} from "umi";

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  /**
   * 国际化配置
   */
  const intl = useIntl();
  return (
    <Modal
      width={1000}
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.announce.createForm.create',
        defaultMessage: '新建公告',
      })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
