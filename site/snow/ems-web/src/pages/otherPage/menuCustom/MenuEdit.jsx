import { Modal, Tree } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useStores from '../../../store';

function Index({ onCancel, onSave, currentMenuId }) {
  const { layout } = useStores();
  const { menuSourceData } = layout;
  const [checkedKeys, setCheckedKeys] = React.useState([]);

  useEffect(() => {
    setCheckedKeys([currentMenuId]);
  }, [currentMenuId]);

  const formatTree = root => {
    const res = [];
    const roots = [...root];
    roots.forEach(item => {
      const { children } = item;
      if (children && children.length > 0) {
        item.children = formatTree(children);
        item.disableCheckbox = true;
      }

      res.push(item);
    });
    return res;
  };

  const handleCheck = (checkedKeys, info) => {
    console.log(checkedKeys, info, 22221);
    setCheckedKeys([checkedKeys[checkedKeys.length - 1]]);
  };

  const handleSave = () => {
    onSave && onSave(checkedKeys[0]);
  };

  return (
    <Modal title="编辑快速导航" open onCancel={onCancel} onOk={handleSave}>
      <div className="max-h-[400px] overflow-y-auto">
        <Tree
          treeData={formatTree(JSON.parse(JSON.stringify(menuSourceData)))}
          checkable
          onCheck={handleCheck}
          checkedKeys={checkedKeys}
          fieldNames={{
            title: 'menuName',
            key: 'menuId',
          }}
        ></Tree>
      </div>
    </Modal>
  );
}

export default observer(Index);
