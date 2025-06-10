import MainContainer from '@c/mainContainer';
import Search from './search';
import Table from './table';

const Index = () => {
  return <MainContainer search={<Search />} table={<Table />} title="实物接收"></MainContainer>;
};

export default Index;
