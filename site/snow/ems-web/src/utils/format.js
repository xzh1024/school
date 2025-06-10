import dayjs from 'dayjs';

export const formatAcquiringStatus = (key) => {
  switch (key) {
    case 0:
      return '未交单';
    case 1:
      return '已交单';
    case 2:
      return '已邮寄';
    case 3:
      return '已接收';
  }
};

export const timeFormat = (value, type = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) return value;

  if (value instanceof Date || typeof value === 'string') {
    return dayjs(value).format(type);
  }

  return value.format(type);
};
