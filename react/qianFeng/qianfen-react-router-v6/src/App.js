import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MRouter from './router/index';
import Tabbar from './components/Tabbar';

// HashRouter 与 BrowserRouter 两种路由模式
function App() {
  return (
    <BrowserRouter>
      <MRouter />

      <Tabbar />
    </BrowserRouter>
  );
}

export default App;
