import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <div className="h-full">
      <Outlet></Outlet>
    </div>
  );
}
