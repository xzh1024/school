import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const { id } = useParams();
  return (
    <div>
      Detail-{id}
      <button
        onClick={() => {
          navigate('/detail/1000');
        }}
      >
        猜你喜欢
      </button>
    </div>
  );
}
