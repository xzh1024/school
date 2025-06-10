import { Select } from 'antd';
import React from 'react';
import { getOuList } from './api';

//通过类型获取小组列表
export default function Index(props) {
  const [compOptions, setCompOptions] = React.useState([]);

  React.useEffect(() => {
    if (props.grouptype) {
      getOuList(props.grouptype).then(res => {
        const data = res.data;
        const options = data.map(item => {
          return {
            value: item.groupId,
            label: item.groupName,
            option: item,
          };
        });
        setCompOptions(options);
      });
    }
  }, [props.grouptype]);

  return (
    <Select
      maxTagCount="responsive"
      showSearch
      allowClear
      className="com-select"
      filterOption={(input, option) => {
        const labelHas = (option?.title ?? '').includes(input);
        return labelHas;
      }}
      {...props}
    >
      {compOptions.map(item => (
        <Select.Option value={item.value} key={item.value} title={item.label} option={item.option}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
}
