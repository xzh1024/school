// import React, { Component } from "react";

// export default class Tabbar extends Component {
//   state = {
//     list: [
//       {
//         id: 1,
//         text: "电影",
//       },
//       {
//         id: 2,
//         text: "影院",
//       },
//       {
//         id: 3,
//         text: "我的",
//       },
//     ],
//   };
//   render() {
//     return (
//       <ul>
//         {this.state.list.map((item, index) => (
//           <li
//             key={item.id}
//             className={this.props.current === index ? "active" : ""}
//             onClick={() => {
//               this.props.changeCurrent(index);
//             }}
//           >
//             {item.text}
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

import React from "react";

const Tabbar = (props) => {
  return (
    <ul>
      {props.list.map((item, index) => (
        <li
          key={item.id}
          className={props.current === index ? "active" : ""}
          onClick={() => {
            props.changeCurrent(index);
          }}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default Tabbar;
