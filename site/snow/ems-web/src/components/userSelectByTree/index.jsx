import { SmallDashOutlined } from '@ant-design/icons';
import { Empty, Input, Modal, Spin, Tree } from 'antd';
import React from 'react';
import { getTreeData } from './api';

const { Search } = Input;

const treeReset = treeNodes => {
  if (treeNodes.length === 0) {
    return;
  }
  treeNodes.forEach(item => {
    let key = item.orgPath;
    item.checkable = false;
    item.selectable = false;
    // 判断节点是否为用户
    if (item.userLdap && item.userId && item.empId) {
      item.checkable = true;
      key = `${key}/${item.userLdap}`;
    }
    item.key = key;
    if (item.children) {
      treeReset(item.children);
    }
  });
};

const findTreeNode = (ldapId, treeData) => {
  let res;
  try {
    treeData.forEach(item => {
      if (item.userLdap && item.userLdap.toUpperCase() === ldapId.toUpperCase()) {
        res = item;
        throw new Error();
      }
      if (item.children && item.children.length > 0) {
        const subRes = findTreeNode(ldapId, item.children);
        if (subRes) {
          res = subRes;
          throw new Error();
        }
      }
    });
  } catch (error) {
    return res;
  }
  return res;
};

const getExpandedKeys = key => {
  const keys = key.split('/');
  keys.shift();
  const expandedKeyList = [];
  keys.forEach((item, index) => {
    let pathKeys = '';
    for (var i = 0; i < index + 1; i++) {
      pathKeys = pathKeys + '/' + keys[i];
    }
    expandedKeyList.push(pathKeys);
  });
  return expandedKeyList;
};

const findTreeNodeByTitle = (title, treeData) => {
  let res = [];
  treeData.forEach(item => {
    if (item.title.indexOf(title) > -1) {
      res = [...res, ...getExpandedKeys(item.key)];
    }
    if (item.children && item.children.length > 0) {
      const subRes = findTreeNodeByTitle(title, item.children);
      res = [...res, ...subRes];
    }
  });
  return Array.from(new Set(res));
};

// value 为包含userLdap的对象数组
export default function Index(props) {
  const { title, multiple, onSelected, value, onChange, disabled } = props;
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [expandedKeys, setExpandedKeys] = React.useState(['/1']);
  const [treeData, setTreeData] = React.useState([]);
  const [currentNode, setCurrentNode] = React.useState([]);
  const [showUserSelect, setShowUserSelect] = React.useState(false);
  const [formValue, setFormValue] = React.useState(value);
  const [loading, setLoading] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getTreeData()
      .then(res => {
        console.log(res);
        const treeData = res.data;
        treeReset(treeData);
        setTreeData(treeData);

        if (value && value.length > 0) {
          if (!Array.isArray(value)) {
            var valueed = value.split(',');
            console.log(valueed);
          }
          console.log(valueed);
          const nodes = valueed.map(item => findTreeNode(item.userLdap, treeData));
          let keys = [];
          nodes.forEach(item => {
            if (!item) return;
            const paths = getExpandedKeys(item.key);
            keys = [...keys, ...paths];
          });
          keys = Array.from(new Set(keys));

          if (keys.length > 0) {
            setExpandedKeys(keys);
            setCheckedKeys(nodes.map(item => item.key));
            setCurrentNode(nodes);
            setFormValue(formateCurrent(nodes));
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCheck = (checked, info) => {
    const selected = checked;

    if (multiple) {
      setCheckedKeys(selected);
      setCurrentNode(info.checkedNodes);
      // onChange && onChange(selected, info.checkedNodes);
      return;
    }

    setCheckedKeys(selected.slice(selected.length - 1));
    setCurrentNode(info.checkedNodes.slice(info.checkedNodes.length - 1));
    // onChange && onChange(selected.slice(selected.length - 1), info.checkedNodes.slice(info.checkedNodes.length - 1));
  };

  const handleExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
  };

  const handleOk = () => {
    console.log(currentNode, 'currentNode');
    setFormValue(formateCurrent(currentNode));
    if (multiple) {
      onSelected &&
        onSelected(
          currentNode.map(item => item.title),
          currentNode,
        );
      // onChange && onChange(currentNode);
      return handleClose();
    }

    onSelected &&
      onSelected(
        currentNode.map(item => item.title),
        currentNode,
      );
    onChange && onChange(currentNode);
    return handleClose();
  };

  const handleClose = () => {
    return setShowUserSelect(false);
  };

  const handleSearch = keyWord => {
    setSearchKey(keyWord);
    setLoading(true);
    getTreeData(keyWord)
      .then(res => {
        const treeData = res.data;
        treeReset(treeData);
        setTreeData(treeData);
        const keys = findTreeNodeByTitle(keyWord, treeData);
        if (keys.length > 0) {
          setExpandedKeys(keys);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formateCurrent = currentNode => {
    const titles = currentNode.map(item => item.title);
    return titles.join(' / ');
  };

  const treeDataBySearch = React.useMemo(() => {
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
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              !disabled && setShowUserSelect(true);
            }}
          >
            <SmallDashOutlined />
          </div>
        }
        disabled={disabled}
      />
      <Modal title={title} open={showUserSelect} width={'40%'} onOk={handleOk} onCancel={handleClose}>
        <div className="user-tree-select-container">
          <div className="user-tree-select-container-search">
            <Search
              placeholder="通过用户名或组织名称搜索"
              className="user-tree-select-container-search-input"
              onSearch={handleSearch}
            />
            {currentNode.length > 0 && (
              <span className="user-tree-select-container-search-select">当前所选：{formateCurrent(currentNode)}</span>
            )}
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
