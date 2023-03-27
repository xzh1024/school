import App from '../App';
import Enzyme, { shallow, mount } from 'enzyme'; // 需要适配器
import adpater from '@mnajdova/enzyme-adapter-react-18'; // 适配器

Enzyme.configure({ adapter: new adpater() });

describe('react-test-render', function () {
  it('app 的名字是kerwin-todo', function () {
    let app = shallow(<App />);
    expect(app.find('h2').text()).toEqual('kerwin-todo');
  });

  it('删除功能', function () {
    let app = mount(<App />);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).toBe(todoLength - 1);
  });

  it('添加功能', function () {
    let app = mount(<App />);
    let todoLength = app.find('li').length;
    let addInput = app.find('input');
    addInput.value = 'test002';
    app.find('button.add').simulate('click');
    expect(app.find('li').length).toBe(todoLength + 1);
  });
});
