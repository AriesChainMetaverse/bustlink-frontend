import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, Modal, Radio, Select, Steps, Tree } from 'antd';

import {TableListItem} from '../data.d';
import { querySelectMenuList} from "@/pages/menu/menu-list/service";

export interface FormValueType extends Partial<TableListItem> {
  id?: string;

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
const RadioGroup = Radio.Group;




export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};


const {TreeNode} = Tree;



const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    parent_id: props.values.parent_id,
    parent_name: props.values.parent_name,
    comment: props.values.comment,
    name: props.values.name,
    path: props.values.path,

  });

  // const [currentStep, setCurrentStep] = useState<number>(0);
  const [MenuList, setMenuList] = useState<[]>([]);
  const [TreeData, setTreeData] = useState<[]>([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // const forward = () => setCurrentStep(currentStep + 1);
  //
  // const backward = () => setCurrentStep(currentStep - 1);

  useEffect(() => {
    getSelectMenuList("00000000-0000-0000-0000-000000000000").then(r => setTreeData(r));
  }, []);

  async function getSelectMenuList(parentID) {

    const MenuList = await querySelectMenuList(parentID)
    const SelectMenuList: { name: any; key: any; }[] = []
    MenuList.forEach((item: { name: any; id: any; }) => {
      SelectMenuList.push({ name: item.name, key: item.id }
      );
    })
    console.log("selectmemu list is ",SelectMenuList)
    return SelectMenuList
  };

  const onSelect= (info) =>{
    console.log('selected', info);
  };


  const onLoadData = (treeNode) => {
    console.log("treeNode ",treeNode)
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...TreeData];
        console.log("treedata ",treeData)
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        setTreeData(treeData);
        console.log("newtreedata",treeData)

        resolve();
      }, 500);
    });
  };



  const generateTreeNodes = (treeNode) => {
    const arr: { name: any; key: any; }[] = [];
    const key = treeNode.props.eventKey;

    getSelectMenuList(key).then(r => {
      r.forEach((item) => {
        arr.push({ name: item.name, key: item.key }
        );
      })
    });
    console.log("array is",arr)
    return arr;
  };

  const setLeaf = (treeData, curKey, level) => {
    const loopLeaf = (data, lev) => {
      const l = lev - 1;
      data.forEach((item) => {
        if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
          return;
        }
        if (item.children) {
          loopLeaf(item.children, l);
        } else if (l < 1) {
          item.isLeaf = true;
        }
      });
    };
    loopLeaf(treeData, level + 1);
  }

  const getNewTreeData = (treeData, curKey, child, level) => {
    const loop1 = (data) => {
      // if (level < 1 || curKey.length - 3 > level * 2) return;
      data.forEach((item) => {
        if (curKey.indexOf(item.key) === 0) {
          if (item.children) {
            loop1(item.children);
          } else {
            item.children = child;
          }
        }
      });
    };
    loop1(treeData);
    setLeaf(treeData, curKey, level);
  }




  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    handleUpdate({...formVals, ...fieldsValue});

  };

  const loop = data =>
    data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
    });

  const treeNodes = loop(TreeData);

  const renderContent = () => {



    return (
      <>
        <FormItem
          name="id"
          label="ID"
        >
          <Input placeholder="请输入" disabled={true}/>
        </FormItem>
        <FormItem
          name="name"
          label="名称"
          rules={[{required: true, message: '请输入至少两个字符的描述！', min: 2}]}
        >
          <Input placeholder="请输入"/>
        </FormItem>


        <FormItem
          name="parent_id"
          label="父级菜单"
        >
          {/*  <Input placeholder="请输入" />*/}
          <Tree onSelect={onSelect} loadData={onLoadData}>
            {treeNodes}
          </Tree>


        </FormItem>
        <FormItem
          name="path"
          label="路径"
        >
          <Input placeholder="请输入"/>
        </FormItem>

        <FormItem
          name="comment"
          label="描述"
          rules={[{required: true, message: '请输入至少两个字符的描述！', min: 2}]}
        >
          <TextArea rows={4} placeholder="请输入至少两个字符"/>
        </FormItem>


      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
    // }
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
    // return (
    //   <>
    //     <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //     <Button type="primary" onClick={() => handleNext()}>
    //       下一步
    //     </Button>
    //   </>
    // );
  };

  return (
    <Modal
      width={1000}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title="菜单编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={{

          id: formVals.id,
          name: formVals.name,
          comment: formVals.comment,
          parent_id: formVals.parent_id,
          parent_name: formVals.parent_name,
          path: formVals.path,


        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
