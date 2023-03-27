import React, { PureComponent } from "react";
import axios from "axios";
import BetterScroll from "better-scroll";

/**
 * PureComponent会帮你比较新props跟旧的props，新的state和老的state（值相等，
 * 或者对象含有相同的属性、且属性值相等），决定 shouldComponentUpdate 返回
 * true 或者 false ，从而决定要不要呼叫 render function。
 * 
 * 注意
 *    如果你的 state 或 props "永远都会变"，那 PureComponent 并不会比较快，
 *    因为 shallowEqual 也需要花时间。
 * 
 * **/
export default class App extends PureComponent {
  state = {
    myName: "aaa",
    list: [],
    bs: null,
  };

  componentDidMount() {
    axios.get("/test.json").then((res) => {
      console.log(res.data);
      this.setState({
        list: res.data || [],
      });
    });

    new BetterScroll("#wrapper", {
      probeType: 3,
      mouseWheel: true,
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
  //     console.log(666);
  //     return true;
  //   }
  //   return false;
  // }

  UNSAFE_componentWillUpdate() {
    console.log("更新前");
    console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("更新后");
    console.log("旧的props:", prevProps);
    console.log("旧的state:", prevState);
    console.log(this.state);
    // 更新后，想要获取dom节点，更新

    if (prevState.list.length === 0) {
      new BetterScroll("#wrapper", {
        probeType: 3,
        mouseWheel: true,
      });
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              myName: "bbb",
            });
          }}
        >
          click
        </button>
        <h3>{this.state.myName}</h3>

        <div id="wrapper" style={{ height: "200px", overflow: "hidden" }}>
          <div>
            {this.state.list.map((item) => (
              <div key={item.filmId}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
