import MainContainer from '@c/mainContainer';
import Cards from './cards';
import ToolBar from './tool-bar';

const Index = () => {
  return (
    <MainContainer title="收件地址">
      <div className="bg-white p-6">
        <ToolBar />
        <Cards />
      </div>
    </MainContainer>
  );
};

export default Index;
