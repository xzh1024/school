import { SmallDashOutlined } from '@ant-design/icons';
import { Empty, Input, Modal, Spin, Tree, message } from 'antd';
import React, { useMemo } from 'react';
import { getTreeData, searchlist } from './api';

let treeDataList = [];

const { Search } = Input;

const treeReset = treeNodes => {
  if (treeNodes.length === 0) {
    return;
  }
  treeNodes.forEach(item => {
    item.selectable = false;
    item.key = item.id;
    item.title = item.name;
    if (item.children) {
      treeReset(item.children);
    }
  });
};

const findTreeNode = keyWord => {
  return treeDataList
    .filter(node => {
      return (node.name && node.name.indexOf(keyWord) > -1) || node.id.indexOf(keyWord) > -1;
    })
    .map(item => item.id);
};

const findKeyPath = id => {
  let res = [];
  if (!id) return res;

  for (var i = 0; i < treeDataList.length; i++) {
    const node = treeDataList[i];
    if (node.id === id) {
      res = [...res, node.id, ...findKeyPath(node.pId, treeDataList)];
      break;
    }
  }

  return res;
};

// value 为包含userLdap的对象数组
export default function Index(props) {
  const { title, multiple, onSelected, value, onChange, mun } = props;
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [expandedKeys, setExpandedKeys] = React.useState([1]);
  const [treeData, setTreeData] = React.useState([]);
  const [currentNode, setCurrentNode] = React.useState([]);
  const [showUserSelect, setShowUserSelect] = React.useState(false);
  const [formValue, setFormValue] = React.useState(value);
  const [loading, setLoading] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');

  React.useEffect(() => {
    setLoading(true);

    getTreeData(9)
      .then(res => {
        const treeData = res.data;
        // treeReset(resArr);
        setTreeData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateTreeData = (list, id, children) =>
    list.map(node => {
      if (node.id === id) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, id, children),
        };
      }
      return node;
    });
  const onLoadData = ({ id, children }) =>
    new Promise(resolve => {
      console.log(id, children, 1111);
      if (children) {
        resolve();
        return;
      }
      getTreeData(id)
        .then(res => {
          console.log(res.data, 3333);
          setTreeData(origin => updateTreeData(origin, id, res.data));
          resolve();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  const handleCheck = (checked, info) => {
    console.log(checked, info, 2222);
    if (mun) {
      if (checkedKeys.length > mun - 1 && info.checked === true) {
        message.warning(`最多选择${mun}个部门`);
        return;
      }
    } else {
      if (checkedKeys.length > 4 && info.checked === true) {
        message.warning('最多选择5个部门');
        return;
      }
    }

    const selected = checked;

    if (multiple) {
      setCheckedKeys(selected);
      setCurrentNode(info.checkedNodes);
      // onChange && onChange(selected, info.checkedNodes);
      return;
    }
    setCheckedKeys(selected.slice(selected.length - 1));
    setCurrentNode(info.checkedNodes.slice(info.checkedNodes.length - 1));
  };

  const handleExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
  };

  const handleOk = () => {
    onChange && onChange(checkedKeys, currentNode);
    console.log(currentNode);

    // let resArr = [];
    // currentNode.reduce((prev, curr, i, arr) => {
    //   curr.children = arr.filter(v => v.pId === curr.id && v.name);
    //   if (!curr.pId && curr.name) {
    //     prev.push(curr);
    //   }
    //   return prev;
    // }, resArr);
    // if (resArr.length === 0) {
    //   resArr = [...currentNode];
    // }

    setFormValue(currentNode.map(item => item.orgName).join('/'));
    return handleClose();
  };

  const handleClose = () => {
    return setShowUserSelect(false);
  };

  const handleSearch = keyWord => {
    console.log(keyWord, 1111);
    if (!keyWord) {
      setExpandedKeys([]);
      setSearchKey('');
      return;
    }
    searchlist(keyWord).then(res => {
      console.log(res);
      setTreeData(res.data);
    });

    // setSearchKey(keyWord);
    // const keys = findTreeNode(keyWord);
    // let keyPath = [];
    // keys.forEach(key => {
    //   keyPath = [...keyPath, ...findKeyPath(key)];
    // });
    // setExpandedKeys(Array.from(new Set(keyPath)));
  };

  // const treeDataBySearch = useMemo(() => {
  //   const loop = data => {
  //     return data.map(item => {
  //       const strTitle = item.title;
  //       const index = strTitle.indexOf(searchKey);
  //       const beforeStr = strTitle.substring(0, index);
  //       const afterStr = strTitle.slice(index + searchKey.length);
  //       const title =
  //         index > -1 ? (
  //           <span>
  //             {beforeStr}
  //             <span className="tree-search-value">{searchKey}</span>
  //             {afterStr}
  //           </span>
  //         ) : (
  //           <span>{strTitle}</span>
  //         );
  //       if (item.children) {
  //         return {
  //           ...item,
  //           nodeTitle: title,
  //           children: loop(item.children),
  //         };
  //       }
  //       return {
  //         ...item,
  //         nodeTitle: title,
  //       };
  //     });
  //   };
  //   return loop(treeData);
  // }, [searchKey, treeData]);

  return (
    <>
      <Input
        readOnly
        value={formValue}
        addonAfter={
          <div style={{ cursor: 'pointer' }} onClick={() => setShowUserSelect(true)}>
            <SmallDashOutlined />
          </div>
        }
      />

      <Modal title={title} open={showUserSelect} width={'40%'} onOk={handleOk} onCancel={handleClose} closeIcon={false}>
        <div className="user-tree-select-container">
          <div className="user-tree-select-container-search">
            <Search
              placeholder="通过类别名称搜索"
              className="user-tree-select-container-search-input"
              onSearch={handleSearch}
            />
            {/* {currentNode.length > 0 && (
              <span className="user-tree-select-container-search-select">当前所选：{formateCurrent(currentNode)}</span>
            )} */}
          </div>
          <div className="user-tree-select-container-tree">
            <Spin spinning={loading}>
              {treeData.length > 0 ? (
                <Tree
                  treeData={treeData}
                  loadData={onLoadData}
                  checkable
                  onCheck={handleCheck}
                  checkedKeys={checkedKeys}
                  expandedKeys={expandedKeys}
                  fieldNames={{
                    key: 'id',
                    title: 'orgName',
                  }}
                  onExpand={handleExpand}
                />
              ) : (
                <Empty description="暂无组织信息" />
              )}
            </Spin>
          </div>
        </div>
      </Modal>
    </>
  );
}
