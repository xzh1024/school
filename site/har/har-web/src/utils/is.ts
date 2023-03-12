export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isUndef(val: unknown): val is undefined {
  return typeof val === 'undefined';
}

export function isDef<T>(val?: T) {
  return !isUndef(val);
}
export function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val);
}

export function isObject(val: any) {
  return !isNull(val) && is(val, 'Object');
}
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}
export function isArray(val: any): val is any[] {
  return val && Array.isArray(val);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
