import { NavBar } from 'antd-mobile';
import { history, useLocation, useParams } from 'umi';

export default function Detail() {
  const location = useLocation();
  const params = useParams();
  console.log(location);
  console.log(params.id);
  return (
    <div>
      <NavBar onBack={() => history.back()}>影片详情</NavBar>
      detail-{params.id}
    </div>
  );
}
