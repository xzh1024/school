import React, { Component } from 'react';

interface IState {
  text: string;
  list: string[];
}
class App extends Component<any, IState> {
  state = {
    text: '',
    list: [],
  };

  myRef = React.createRef<HTMLInputElement>();
  render() {
    return (
      <div>
        {/* <input
          type="text"
          value={this.state.text}
          onChange={(e) =>
            this.setState({
              text: e.target.value,
            })
          }
        /> */}
        <input type="text" ref={this.myRef} />
        <button
          onClick={() => {
            // console.log(this.myRef.current?.value);
            console.log((this.myRef.current as HTMLInputElement).value); // 断言

            this.setState(
              {
                list: [
                  ...this.state.list,
                  (this.myRef.current as HTMLInputElement).value,
                ],
              },
              () => {
                (this.myRef.current as HTMLInputElement).value = '';
              }
            );
          }}
        >
          click
        </button>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
