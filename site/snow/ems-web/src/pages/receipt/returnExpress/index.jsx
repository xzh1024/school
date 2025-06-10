import MainContainer from '@c/mainContainer';
import Search from './serch';
import Table from './table';

export default function Index() {
  return <MainContainer title="退单邮寄管理" search={<Search />} table={<Table />}></MainContainer>;
}
