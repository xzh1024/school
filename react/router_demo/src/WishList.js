import React, { Component } from 'react';


class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, isCompleted: true, content: '吃饭' },
        { id: 2, isCompleted: false, content: '睡觉' },
        { id: 3, isCompleted: true, content: '打豆豆' }
      ]
    }
  }

  render () {
    const { todos } = this.state; 
    return (
      <ul>
        {
          todos.map(todo => {
            return (
              <li key={todo.id}>
                <span>{todo.id}</span>
                <span>{todo.isCompleted}</span>
                <span>{todo.content}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default WishList;