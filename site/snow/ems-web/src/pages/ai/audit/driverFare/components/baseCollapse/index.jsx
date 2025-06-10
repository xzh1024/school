import React, { useState } from 'react';
import { ReactComponent as IconStar } from 'public/svg/icon_star.svg';
import { ReactComponent as IconUp } from 'public/svg/icon_up.svg';

export default function index(props) {
  const { title = '', content } = props;
  const [show, setShow] = useState(true);
  return (
    <div className="bg-white rounded-[10px] px-4">
      <div className="h-[50px] flex items-center box-border rounded-t select-none">
        <IconStar className="mr-1.5" />
        <div className="flex-1 text-[16px] text-[#3D3D3D] font-medium">{title}</div>
        <IconUp
          className={
            show
              ? 'animate__animated animate__fadeIn cursor-pointer'
              : 'animate__animated animate__fadeIn rotate-180 cursor-pointer'
          }
          onClick={() => setShow(!show)}
        />
      </div>
      <div
        className={
          show ? 'animate__animated animate__fadeIn pb-4 block' : 'animate__animated animate__fadeIn pb-4 hidden'
        }
      >
        {content}
      </div>
    </div>
  );
}
