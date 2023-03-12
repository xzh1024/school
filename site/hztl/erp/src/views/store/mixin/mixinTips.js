import { Message } from "hztl-ui";

export function checkTips(rule, value, calllback) {
  if (value) {
    calllback();
  } else {
    calllback(new Error(rule.message));
    Message({
      message: rule.message,
      type: "warning"
    });
  }
}

export function tips(value) {
  Message({
    message: value,
    type: "warning"
  });
}
