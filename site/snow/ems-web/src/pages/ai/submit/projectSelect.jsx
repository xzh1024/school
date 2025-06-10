import { SearchOutlined } from '@ant-design/icons';
import { getProjectOptions } from '@api/ai';
import { Button, Select } from 'antd';
import { throttle } from 'lodash';
import React, { useEffect } from 'react';
import useStores from '@s';

export default function Index(props) {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { onConfirm, onSelect, onInit, onCancel, isFormItem, hiddenBtn, defaultValue } = props;
  const { aiSubmit } = useStores();
  const { initData, initProjectOptions } = aiSubmit;
  const { userCode, companyCode } = initData;
  const [selectValue, setSelectValue] = React.useState(null);

  useEffect(() => {
    setOptions(initProjectOptions);
  }, [initProjectOptions]);

  // 获取研发列表
  const getProject = searchKey => {
    setLoading(true);
    return getProjectOptions({
      pageIndex: 1,
      pageSize: 999,
      searchKey: searchKey || '',
      ouCode: companyCode,
      empCode: userCode,
    })
      .then(res => {
        if (res.code === 200) {
          const data = res.data.records || [];
          setOptions(data);
        }
        return res;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 选择
  const handleChange = (value, option) => {
    setSelectValue(option);
    typeof onSelect === 'function' && onSelect(value, option);
  };

  // 取消
  const handleCancel = () => {
    typeof onCancel === 'function' && onCancel();
  };

  // 确定
  const handleConfirm = () => {
    typeof onConfirm === 'function' && onConfirm(selectValue);
  };

  const handleSearch = throttle(
    keyword => {
      getProject(keyword);
    },
    1000,
    {
      leading: false,
    },
  );

  return isFormItem ? (
    <Select
      defaultValue={defaultValue}
      className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
      style={{
        color: '#2C68FF',
      }}
      onChange={handleChange}
      onSearch={handleSearch}
      filterOption={false}
      fieldNames={{
        value: 'devProjectCode',
        label: 'devProjectName',
      }}
      options={options}
      suffixIcon={<SearchOutlined />}
      placeholder="请输入项目名称、编号搜索"
      showSearch
    ></Select>
  ) : (
    <div>
      <div>是否因研发项目提报事前申请？</div>
      {!hiddenBtn && (
        <div className="mt-3 project-select">
          <Button
            ghost
            type="default"
            className="border-[#2C68FF] text-[#2C68FF] rounded-md mr-2"
            onClick={handleCancel}
          >
            不是
          </Button>
          <Select
            defaultValue={defaultValue}
            className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
            style={{
              color: '#2C68FF',
            }}
            onChange={handleChange}
            onSearch={handleSearch}
            filterOption={false}
            fieldNames={{
              value: 'devProjectCode',
              label: 'devProjectName',
            }}
            options={options}
            suffixIcon={<SearchOutlined />}
            placeholder="请输入项目名称、编号搜索"
            showSearch
          ></Select>
          <Button type="default" disabled={!selectValue} onClick={handleConfirm}>
            确定
          </Button>
        </div>
      )}
    </div>
  );
}
