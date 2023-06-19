import React from 'react';
import style from './Child.module.scss';

export default function Child() {
  return (
    <div>
      <ul>
        <li className={style.item}>Child-1111</li>
        <li className={style.item}>Child-2222</li>
      </ul>
    </div>
  );
}
