import { Link, Outlet, useLocation } from 'umi';
import styles from './index.less';
import MainLayout from '../components/Layout/MainLayout'
const whiteRouterList = [
  '/film',
  '/cinema',
  '/center',
]

export default function Layout() {
  const location = useLocation();
  if (whiteRouterList.includes(location.pathname)) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }

  return <Outlet />;

  // return (
  //   <div className={styles.navs}>
  //     <ul>
  //       <li>
  //         <Link to="/film">Film</Link>
  //       </li>
  //       <li>
  //         <Link to="/cinema">Cinema</Link>
  //       </li>
  //       <li>
  //         <Link to="/center">Center</Link>
  //       </li>
  //     </ul>
  //     <Outlet />
  //   </div>
  // );
}
