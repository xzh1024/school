import React from 'react';

export default function App() {
  return (
    <div>
      App
      <Child name="aaa"></Child>
    </div>
  );
}

interface IProps {
  name: string;
}

// function Child(props: IProps) {
//   console.log(props);
//   return <div>child-{props.name}</div>;
// }

const Child: React.FC<IProps> = (props) => {
  console.log(props);
  return <div>child-{props.name}</div>;
};
