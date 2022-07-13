import React, { Component } from 'react';
import { Map } from 'immutable';

export default class App extends Component {
  state = {
    info: Map({
      name: '张三',
      select: 'aa',
      filter: Map({
        text: '123',
        up: true,
        down: false,
      }),
    }),
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              info: this.state.info
                .set('name', 'xiaoming')
                .set('select', 'dwadwa'),
              // .set('filter', Map({ text: '666' })),
            });
          }}
        >
          click
        </button>
        {this.state.info.get('name')}
        <Child filter={this.state.info.get('filter')} />
      </div>
    );
  }
}

class Child extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filter === nextProps.filter) {
      return false;
    }
    return true;
  }

  render() {
    console.log(this.props);
    return <div>{this.props.filter.get('text')}</div>;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }
}
