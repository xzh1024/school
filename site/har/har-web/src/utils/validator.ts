export function validatorTEL(value: string, callback: Function) {
  if (
    /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value) ||
    /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(value)
  ) {
    return callback();
  }
  callback('联系电话格式错误');
}

export function validatorMobilePhone(value: string, callback: Function) {
  if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
    return callback();
  }
  callback('联系电话格式错误');
}
