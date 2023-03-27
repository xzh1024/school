import { createRenderer } from 'react-test-renderer/shallow'; // 浅层的
import App from '../App';
import ReactTestUtil from 'react-dom/test-utils';

describe('react-test-render', function () {
  it('app 的名字是kerwin-todo', function () {
    const render = createRenderer();
    render.render(<App />);
    console.log(render.getRenderOutput().props.children);
    expect(render.getRenderOutput().props.children[0].type).toBe('h2');
    expect(render.getRenderOutput().props.children[0].props.children).toBe(
      'kerwin-todo'
    );
  });

  it('删除功能', function () {
    const app = ReactTestUtil.renderIntoDocument(<App />);
    let todoItems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li');
    console.log(todoItems.length);

    let deleteButton = todoItems[0].querySelector('button');
    ReactTestUtil.Simulate.click(deleteButton);

    let todoItemsAfterClick = ReactTestUtil.scryRenderedDOMComponentsWithTag(
      app,
      'li'
    );

    console.log(todoItemsAfterClick.length);
    expect(todoItemsAfterClick.length).toBe(todoItems.length - 1);
  });

  it('添加功能', function () {
    const app = ReactTestUtil.renderIntoDocument(<App />);
    let todoItems = ReactTestUtil.scryRenderedDOMComponentsWithTag(app, 'li');
    console.log(todoItems.length);

    let addInput = ReactTestUtil.findRenderedDOMComponentWithTag(app, 'input');
    // console.log('addInput');
    addInput.value = 'test001';

    let addButton = ReactTestUtil.findRenderedDOMComponentWithClass(app, 'add');
    ReactTestUtil.Simulate.click(addButton);

    let todoItemsAfterClick = ReactTestUtil.scryRenderedDOMComponentsWithTag(
      app,
      'li'
    );
    console.log(todoItemsAfterClick.length);

    expect(todoItemsAfterClick.length).toBe(todoItems.length + 1);
  });
});
