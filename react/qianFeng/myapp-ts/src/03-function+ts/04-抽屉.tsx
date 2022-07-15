import React, { useState } from 'react';

export default function App() {
  const [isShow, setIsShow] = useState(true);
  return (
    <div>
      App
      <Navbar
        title="首页"
        cb={() => {
          setIsShow(!isShow);
        }}
      ></Navbar>
      {isShow && <Sidebar></Sidebar>}
    </div>
  );
}

interface IProps {
  title: string;
  cb: () => void;
}
function Navbar(props: IProps) {
  return (
    <div
      onClick={() => {
        props.cb();
      }}
    >
      navbar-{props.title}
    </div>
  );
}

function Sidebar() {
  return <div>sidebar</div>;
}
