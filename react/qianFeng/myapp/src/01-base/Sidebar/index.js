import React from "react";

export default function Sidebar(props) {
  console.log(props);
  const { bg, position } = props;
  const obj1 = {
    left: 0,
  };
  const obj2 = {
    right: 0,
  };
  let styleObj = {
    width: "200px",
    background: bg,
    position: "fixed",
  };
  if (position === "right") {
    Object.assign(styleObj, obj2);
  } else {
    // Object.assign(styleObj, obj1);
    styleObj = {
      ...styleObj,
      ...obj1,
    };
  }
  return (
    <div style={styleObj}>
      <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
        <li>666</li>
        <li>777</li>
      </ul>
    </div>
  );
}
