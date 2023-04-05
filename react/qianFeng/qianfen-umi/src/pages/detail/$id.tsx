import { useLocation, useParams } from 'umi';

interface IParams {
  id: string
}

export default function Detail() {
  const location = useLocation();
  const params = useParams<IParams>();
  console.log(location);
  console.log(params.id);
  return <div>detail-{params.id}</div>;
}
