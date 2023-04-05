import { Navigate, Outlet } from 'umi';

export default function Auth(props: any) {
  console.log(props);
  if (localStorage.getItem('token')) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
