import { InputNumber, Typography } from 'antd';
import React, { useState } from 'react';

export default function Index(props) {
  const { onChange, end = {}, start = {} } = props;
  const [value, setValue] = useState([]);

  const valueChange = (changeValue, isEnd) => {
    const newValue = [...value];
    const index = isEnd ? 1 : 0;
    newValue[index] = changeValue;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div>
      <InputNumber {...start} value={value[0]} onChange={valueChange} />
      <Typography.Text className="px-2">~</Typography.Text>
      <InputNumber {...end} value={value[1]} onChange={value => valueChange(value, true)} />
    </div>
  );
}
