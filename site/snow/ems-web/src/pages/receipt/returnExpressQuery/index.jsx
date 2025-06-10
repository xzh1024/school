import MainContainer from '@c/mainContainer';
import Search from './serch';
import Table from './table';

export default function Index() {
  return <MainContainer search={<Search />} table={<Table />} title="退单查询"></MainContainer>;
}
