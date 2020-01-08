import React, { Component } from 'react';

// class A extends Component {
//   render() {
//     return (
//       <div className="A">
//         A
//       </div>
//     );
//   }
// }

// export default A;
export default (title) => WrappedComponent => class A extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: ''
        }
    }

    onInputChange = (e) => {
      console.log(e.target.value);
      this.setState({
          value: e.target.value
      })
    }

    render() {
        console.log(this);

        const newProps = {
          value: this.state.value,
          onInput: this.onInputChange
        }
        return (
            <div className="A">
                <div>{title}</div>
                <div>
                  <WrappedComponent sex={'男'} {...this.props} {...newProps} />
                </div>
            </div>
        );
    }
};
