import React from 'react';
import { withRouter } from 'react-router-dom';

function Center(props) {
  return (
    <div>
      Center
      <div
        onClick={() => {
          console.log(props);
          props.history.push(`/filmssorder`);
        }}
      >
        电影订单
      </div>
    </div>
  );
}

export default withRouter(Center);
