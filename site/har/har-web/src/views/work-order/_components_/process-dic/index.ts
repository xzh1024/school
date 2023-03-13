export const startEl = 'startEvent';

export const userTaskEl = 'UserTask';
export const taskEl = 'Task';

export function replacePrefix(str: string) {
  return (str || '').replace('bpmn:', '').replace('bpmn2:', '');
}

export function isStartElement(type: string) {
  type = replacePrefix(type);
  return type.toUpperCase() === 'STARTEVENT';
}

export function isTaskElement(type: string) {
  type = replacePrefix(type);
  return ['USERTASK', 'TASK'].includes(type.toUpperCase());
}
