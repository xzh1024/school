import React, { useState } from 'react';
import store from '../redux/store';
// import { withRouter } from 'react-router-dom';

export default function City(props) {
  const [list, setlist] = useState(['北京', '上海', '深圳', '广州']);

  const handleClick = (item) => {
    console.log(props);
    store.dispatch({
      type: 'change-city',
      value: item,
    });
    props.history.goBack();
  };
  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default withRouter(City);
