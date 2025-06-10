import { getAccountingGroupList } from '@api/newInvoiceMonitoring';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

export default function Index(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAccountingGroupList().then(res => {
      const optionsData = res.data.accountGroups || [];
      const optionsList = optionsData.map(item => {
        return {
          label: item.groupName,
          value: item.groupCode,
        };
      });
      setOptions(optionsList);
    });
  }, []);

  return (
    <Select
      options={options}
      showSearch
      allowClear
      filterOption={(input, option) => {
        const labelHas = (option?.label ?? '').includes(input);
        const valueHas = (option?.value ?? '').includes(input.toUpperCase());
        return labelHas || valueHas;
      }}
      {...props}
    ></Select>
  );
}
