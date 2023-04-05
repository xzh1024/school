import Tabbar from '../Tabbar/Tabbar';
import './MainLayout.less';

export default function MainLayout(props) {
  return (
    <div className="main-layout">
      {/* <div className="header">head</div> */}
      <div className="main">{props.children}</div>
      <Tabbar />
    </div>
  );
}
