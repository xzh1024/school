import React from 'react';

export default function Login(props) {
  return (
    <div>
      <h3>登录页面</h3>
      <input type="text" />
      <button
        onClick={() => {
          localStorage.setItem('token', '123');
          props.history.push('/center');
        }}
      >
        登录
      </button>
    </div>
  );
}
