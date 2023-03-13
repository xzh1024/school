import is, { hasProperty } from '@form-create/utils/lib/type';
import { parseFn } from '@form-create/utils/lib/json';

export const defaultOptions = [
  {
    label: '选项1',
    value: '选项1'
  },
  {
    label: '选项2',
    value: '选项2'
  }
];

export function useRequired() {
  return {
    type: 'switch',
    field: 'required',
    // field: 'effect>required',
    title: '是否必填',
    value: false
  };
}

export function useLabel() {
  return {
    type: 'switch',
    field: 'hide-label',
    title: '是否隐藏标签',
    value: false
  };
}

export function usePlaceholder(type?: string) {
  return {
    type: 'input',
    field: 'placeholder',
    title: '占位内容',
    value: type === 'select' ? '请选择' : '请输入'
  };
}

export function useOptions(type = 'single') {
  return {
    type: 'Struct',
    title: '选项数据',
    field: 'options',
    props: { defaultValue: defaultOptions, type }
  };
}

export function useSize() {
  return {
    type: 'select',
    field: 'size',
    title: '尺寸',
    options: [
      { value: 'mini', label: '迷你' },
      { value: 'small', label: '小尺寸' },
      { value: 'medium', label: '中等' },
      { value: 'large', label: '大尺寸' }
    ]
  };
}

export function useDisabled() {
  return {
    type: 'switch',
    field: 'disabled',
    title: '是否禁用',
    value: false
  };
}

export function useReadonly() {
  return {
    type: 'switch',
    field: 'readonly',
    title: '是否只读',
    value: false
  };
}

export function useClear() {
  return {
    type: 'switch',
    field: 'allow-clear',
    title: '是否显示清除按钮',
    value: true
  };
}

export function upper(str: string) {
  return str.replace(str[0], str[0].toLocaleUpperCase());
}

export const toJSON = function (val: any) {
  const type = /object ([a-zA-Z]*)/.exec(Object.prototype.toString.call(val));
  // @ts-ignore
  if (type && _toJSON[type[1].toLowerCase()]) {
    // @ts-ignore
    return _toJSON[type[1].toLowerCase()](val);
  } else {
    return val;
  }
};

const _toJSON = {
  object(val: any) {
    const json: string[] = [];
    for (const i in val) {
      if (!hasProperty(val, i)) continue;
      json.push(toJSON(i) + ': ' + (val[i] != null ? toJSON(val[i]) : 'null'));
    }
    return '{\n ' + json.join(',\n ') + '\n}';
  },
  array(val: any) {
    const json: any = [];
    val.forEach((item: any, i: number) => {
      json[i] = item != null ? toJSON(item) : 'null';
    });
    return [...json];
  },
  string(val: any) {
    const tmp = val.split('');
    for (let i = 0; i < tmp.length; i++) {
      let c = tmp[i];
      c >= ' '
        ? c === '\\'
          ? (tmp[i] = '\\\\')
          : c === '"'
          ? (tmp[i] = '\\"')
          : 0
        : (tmp[i] =
            c === '\n'
              ? '\\n'
              : c === '\r'
              ? '\\r'
              : c === '\t'
              ? '\\t'
              : c === '\b'
              ? '\\b'
              : c === '\f'
              ? '\\f'
              : ((c = c.charCodeAt()), '\\u00' + (c > 15 ? 1 : 0) + (c % 16)));
    }
    return '"' + tmp.join('') + '"';
  }
};

export function deepParseFn(target: { [x: string]: any }) {
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const data = target[key];
      if (Array.isArray(data) || is.Object(data)) {
        deepParseFn(data);
      }
      if (is.String(data)) {
        target[key] = parseFn(data);
      }
    }
  }
  return target;
}
