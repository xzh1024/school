import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Comingsoon() {
  const [list, setlist] = useState([]);
  useEffect(() => {
    axios({
      url: '/ajax/comingList?ci=59&limit=10&movieIds=&token=&optimus_uuid=0FBF24E0FB6011EC81BE37F2ACFC2475D7E08FCDC3564987925806F15D7B7276&optimus_risk_level=71&optimus_code=10',
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.nm}</li>
        ))}
      </ul>
    </div>
  );
}
