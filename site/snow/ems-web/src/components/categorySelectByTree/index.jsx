import { SmallDashOutlined } from '@ant-design/icons';
import { Empty, Input, Modal, Spin, Tree } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { getTreeData } from './api';

let treeDataList = [];

const { Search } = Input;

/**
 * 在会计处理-小组工作范围新增时，需要层级字段
 * @param {*} treeNodes 树节点
 * @param {*} level 当前节点层级
 * @returns
 */
const treeReset = (treeNodes, level = 1) => {
  if (treeNodes.length === 0) {
    return;
  }
  treeNodes.forEach(item => {
    item.selectable = false;
    item.key = item.id;
    item.title = item.name;
    item.level = level;
    if (item.children) {
      treeReset(item.children, level + 1);
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
  const { title, multiple, onSelected, value, onChange, defaultValue } = props;
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [expandedKeys, setExpandedKeys] = React.useState([]);
  const [treeData, setTreeData] = React.useState([]);
  const [currentNode, setCurrentNode] = React.useState([]);
  const [showUserSelect, setShowUserSelect] = React.useState(false);
  const [formValue, setFormValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');
  useEffect(() => {
    if (!formValue) {
      setFormValue(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    setLoading(true);

    getTreeData()
      .then(res => {
        const treeData = res.data;
        const resArr = [];
        treeDataList = treeData;
        treeData.reduce((prev, curr, i, arr) => {
          curr.children = arr.filter(v => v.pId === curr.id && v.name);
          if (!curr.pId && curr.name) {
            prev.push(curr);
          }
          return prev;
        }, resArr);
        console.log(resArr, 'resArr');
        treeReset(resArr);
        setTreeData(resArr);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCheck = (checked, info) => {
    console.log(checked, info, 2222);
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

    let resArr = [];
    currentNode.reduce((prev, curr, i, arr) => {
      curr.children = arr.filter(v => v.pId === curr.id && v.name);
      if (!curr.pId && curr.name) {
        prev.push(curr);
      }
      return prev;
    }, resArr);
    if (resArr.length === 0) {
      resArr = [...currentNode];
    }

    setFormValue(resArr.map(item => item.title).join('/'));

    return handleClose();
  };

  const handleClose = () => {
    return setShowUserSelect(false);
  };

  const handleSearch = keyWord => {
    setSearchKey(keyWord);
    const keys = findTreeNode(keyWord);
    let keyPath = [];
    keys.forEach(key => {
      keyPath = [...keyPath, ...findKeyPath(key)];
    });
    setExpandedKeys(Array.from(new Set(keyPath)));
  };

  const treeDataBySearch = useMemo(() => {
    const loop = data => {
      return data.map(item => {
        const strTitle = item.title;
        const index = strTitle.indexOf(searchKey);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchKey.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="tree-search-value">{searchKey}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return {
            ...item,
            nodeTitle: title,
            children: loop(item.children),
          };
        }
        return {
          ...item,
          nodeTitle: title,
        };
      });
    };
    return loop(treeData);
  }, [searchKey, treeData]);

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
                  treeData={treeDataBySearch}
                  checkable
                  onCheck={handleCheck}
                  checkedKeys={checkedKeys}
                  expandedKeys={expandedKeys}
                  onExpand={handleExpand}
                  fieldNames={{
                    title: 'nodeTitle',
                  }}
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
