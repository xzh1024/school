import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import React, { useEffect } from 'react';
import useStores from '@s';

export default function Index(props) {
  const [options, setOptions] = React.useState([]);
  const { onConfirm, onSelect, onCancel, isFormItem, hiddenBtn, defaultValue } = props;
  const { aiSubmit } = useStores();
  const { myMeetingList } = aiSubmit;
  const [selectValue, setSelectValue] = React.useState(null);

  useEffect(() => {
    setOptions(
      myMeetingList.map(item => {
        return {
          label: item,
          value: item,
        };
      }),
    );
  }, [myMeetingList]);

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

  return isFormItem ? (
    <Select
      defaultValue={defaultValue}
      className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
      style={{
        color: '#2C68FF',
      }}
      onChange={handleChange}
      options={options}
      suffixIcon={<SearchOutlined />}
      placeholder="输入会议编号、名称搜索"
      showSearch
    ></Select>
  ) : (
    <div>
      <div>是否因会议出差？</div>
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
            options={options}
            suffixIcon={<SearchOutlined />}
            placeholder="输入会议编号、名称搜索"
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
