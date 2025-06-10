import { SearchOutlined } from '@ant-design/icons';
import { queryCities } from '@api/ai';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useMemo } from 'react';
import useStores from '@s';

export default function Index(props) {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {
    onSelect,
    onCancel,
    defaultValue = [],
    debounceTimeout = 800,
    maxCount = 0,
    isHistory = false,
    fieldNames = {
      value: 'districtId',
      label: 'districtName',
    },
  } = props;
  const { aiSubmit } = useStores();
  const { initData } = aiSubmit;
  const { orgId, positionCode, positionId, userName } = initData;
  const [selectValue, setSelectValue] = React.useState(null);
  const [selectProps, setSelectProps] = React.useState({});

  useEffect(() => {
    setOptions(defaultValue);
    const defaultSelectProps = {
      mode: 'multiple',
      placeholder: '请输入城市名称搜索',
      filterOption: false,
      showSearch: true,
      fieldNames: fieldNames,
    };
    if (maxCount) {
      defaultSelectProps.maxCount = maxCount;
    }
    setSelectProps(defaultSelectProps);
    if (!isHistory) {
      getCities();
    }
  }, []);

  // 获取研发列表
  const getCities = searchKey => {
    setLoading(true);
    return queryCities({
      search: searchKey || '',
      type: 1,
      // deptId: orgId,
      deptId: 0,
      ldapId: null,
      orgId,
      positionCode,
      positionId,
      userName,
    })
      .then(res => {
        if (res.code === 200) {
          const data = res.data || [];
          const list = [
            ...data.map(item => {
              return {
                ...item,
                key: item.districtId,
              };
            }),
          ];
          setOptions(list);
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
    typeof onSelect === 'function' && onSelect(option);
  };

  // 取消
  const handleCancel = () => {
    typeof onCancel === 'function' && onCancel();
  };

  const fetchRef = useRef(0);
  const handleSearch = useMemo(() => {
    const loadOptions = searchKey => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setLoading(true);
      queryCities({
        search: searchKey || '',
        type: 1,
        // deptId: orgId,
        deptId: 0,
        ldapId: null,
        orgId,
        positionCode,
        positionId,
        userName,
      }).then(res => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        if (res.code === 200) {
          const data = res.data || [];
          setOptions(
            data.map(item => {
              return {
                ...item,
                key: item.districtId,
              };
            }),
          );
        }
        setLoading(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [queryCities, debounceTimeout]);

  return (
    <Select
      mode="multiple"
      defaultValue={defaultValue}
      className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
      style={{
        color: '#2C68FF',
      }}
      onChange={handleChange}
      onSearch={handleSearch}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={options}
      suffixIcon={<SearchOutlined />}
      {...selectProps}
    ></Select>
  );
}
