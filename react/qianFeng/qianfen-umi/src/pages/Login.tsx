import { useEffect, useState } from 'react';
import {
  // history,
  useNavigate
} from 'umi';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, []);
  
  return (
    <div>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onInput={(e: any) => {
          console.log(e);
          setUsername(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onInput={(e: any) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (res.ok) {
                localStorage.setItem(
                  'token',
                  JSON.stringify({
                    username,
                    password
                  })
                );
                // history.back();
                // history.go(-1);
                navigate(-1);
              } else {
                alert('用户名密码不匹配');
              }
            });
        }}
      >
        登录
      </button>
    </div>
  );
}
