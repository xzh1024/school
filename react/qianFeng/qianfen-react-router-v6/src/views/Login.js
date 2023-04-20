import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  return (
    <div>
      <h3>登录</h3>
      <input
        type="text"
        value={name}
        onInput={(e) => {
          setName(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (name) {
            localStorage.setItem('token', name);
            // navigate(-1);
            navigate('/center');
          }
        }}
      >
        登录
      </button>
    </div>
  );
}
