
export const copyHeaders = [
    {
        name: "分割线",
        key: "divider",
        type: "divider",
        width: 4
    },
    {
        name: "自定义字段",
        key: "custom",
        type: "custom",
        width: 4
    }
]

export function getDiffSubKey(list, baseKey) {
    let index = 0;
    while (hasCurKey(list, `${baseKey}-${index}`)) {
        index ++;
    }
    return `${baseKey}-${index}`;
}

export function hasCurKey(list, key) {
    return !!list.find(item => item.key === key);
}


export function isSubKey(key) {
    return !!key.includes("-") &&copyHeaders.find(item => key.includes(item.key));
}

export function isBaseKey(key) {
    return copyHeaders.find(item => key ===item.key);
}

export function getBaseKey(key) {
    return key.split("-")[0];
}