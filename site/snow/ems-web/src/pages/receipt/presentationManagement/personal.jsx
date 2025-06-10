import { Divider } from 'antd';
import Search from './search';
import Table from './table';


const Personal = ({ buttons }) => {
  return (
    <>
      <div className="p-4 pt-6 mb-4 bg-white">
        <Search buttons={buttons} />
      </div>
      <div className="bg-white">
        <Table />
      </div>
    </>
  );
};

export default Personal;
