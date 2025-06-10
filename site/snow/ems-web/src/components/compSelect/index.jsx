import { Select, Empty } from 'antd';
import React from 'react';
import { getOuList } from './api';

export default function Index(props) {
  const [compOptions, setCompOptions] = React.useState([]);

  React.useEffect(() => {
    if (compOptions && compOptions.length > 0) {
      return;
    }
    getOuList().then(res => {
      const data = res.data;
      const options = data
        .filter(item => item.compCode)
        .map(item => {
          return {
            value: item.compCode,
            label: item.compName,
            option: item,
          };
        });
      setCompOptions(options);
    });
  }, []);

  return (
    <Select
      maxTagCount="responsive"
      showSearch
      allowClear
      className='com-select'
      filterOption={(input, option) => {
        const labelHas = (option?.title ?? '').includes(input);
        const valueHas = (option?.value ?? '').includes(input.toUpperCase());
        return labelHas || valueHas;
      }}
      {...props}
    >
      {compOptions.map(item => (
        <Select.Option value={item.value} key={item.value} title={item.label} option={item.option}>
          <div>
            <div>{item.label}</div>
            <div style={{ color: '#999999' }}>{item.value}</div>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
}
