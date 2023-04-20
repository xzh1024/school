import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Center() {
  const location = useLocation()
  console.log(location);
  
  const navigate = useNavigate();
  return (
    <div>
      Center
      <br />
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
      >
        退出登录
      </button>
    </div>
  );
}
