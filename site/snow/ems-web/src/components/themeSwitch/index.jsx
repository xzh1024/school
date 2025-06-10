import React, { useState } from 'react';
import { ReactComponent as Day } from '../../../public/svg/day.svg';
import { ReactComponent as Night } from '../../../public/svg/night.svg';
import './index.css';

export default function Index(props) {
  const { className = '', onClick } = props;
  const [isNight, setIsNight] = useState(false);

  const handleClick = () => {
    setIsNight(!isNight);
    onClick && onClick(!isNight);
  };

  return (
    <div
      className={`${className} w-[76px] rounded-[24px] border-[1px] border-solid border-[#EBEBEB] py-1 px-2 shadow-sm relative ${
        isNight ? 'bg-blue-950' : 'bg-white'
      } transition-all duration-500 cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`w-6 h-6 rounded-[50%] border-[4px] border-solid ${
          isNight ? 'border-[#4C466D] bg-[#1C96DB] left-0' : 'border-[#FABE2C] bg-[#FFD578] left-[36px]'
        } relative transition-all duration-500`}
      ></div>
      <div
        className={`absolute left-2 w-6 h-6 ${
          isNight ? 'opacity-0 top-0' : 'opacity-100 top-[-9px]'
        } transition-all duration-500`}
      >
        <Day className="w-6 h-6"></Day>
      </div>
      <div
        className={`absolute  right-2 w-6 h-6 ${
          isNight ? 'opacity-100 top-[-9px]' : 'opacity-0 top-0'
        } transition-all duration-500`}
      >
        <Night className="w-6 h-6"></Night>
      </div>
    </div>
  );
}
