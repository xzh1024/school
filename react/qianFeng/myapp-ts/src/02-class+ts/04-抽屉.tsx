import React, { Component } from 'react';

interface IState {
  isShow: boolean;
}
export default class App extends Component<any, IState> {
  state = {
    isShow: true,
  };
  render() {
    return (
      <div>
        app
        <Navbar
          title="首页"
          cb={() => {
            this.setState({
              isShow: !this.state.isShow,
            });
          }}
        ></Navbar>
        {this.state.isShow && <Sidebar></Sidebar>}
      </div>
    );
  }
}

interface IProps {
  title: string;
  // cb: Function;
  cb: () => void;
}
class Navbar extends Component<IProps, any> {
  render(): React.ReactNode {
    return (
      <div
        onClick={() => {
          this.props.cb();
        }}
      >
        navbar-{this.props.title}
      </div>
    );
  }
}
class Sidebar extends Component {
  render(): React.ReactNode {
    return <div>sidebar</div>;
  }
}
