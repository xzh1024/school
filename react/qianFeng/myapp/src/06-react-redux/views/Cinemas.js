import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import store from '../redux/store';
import { getCinemaListAction } from '../redux/actionCreator/getCinemaListAction';

function Cinemas(props) {
  // const [cityName] = useState(store.getState().CityReducer.cityName);
  const { cityName, cinemaList, getCinemaListAction } = props;

  // const [cinemaList, setCinemaList] = useState(
  //   store.getState().CinemaListReducer.list
  // );

  useEffect(() => {
    if (cinemaList.length === 0) {
      // 去后台取数据
      // store.dispatch(getCinemaListAction());
      getCinemaListAction();
    }
    // 订阅
    // const unsubscribe = store.subscribe(() => {
    //   console.log('Cinema 订阅');
    //   setCinemaList(store.getState().CinemaListReducer.list);
    // });

    // return () => {
    //   // 组件销毁时 取消订阅
    //   unsubscribe();
    // };
  }, [cinemaList, getCinemaListAction]);

  return (
    <div>
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{ float: 'left' }}
          onClick={() => props.history.push('./city')}
        >
          Cinemas-{cityName}
        </div>
        <div
          style={{ float: 'right' }}
          onClick={() => props.history.push('/cinemas/search')}
        >
          搜索
        </div>
      </div>
      <ul>
        {cinemaList.map((item) => (
          <dl
            key={item.cinemaId}
            style={{
              padding: '10px',
            }}
          >
            <dt>{item.name}</dt>
            <dd style={{ fontSize: '12px', color: 'gray' }}>{item.address}</dd>
          </dl>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    cityName: state.CityReducer.cityName,
    cinemaList: state.CinemaListReducer.list,
  };
};
const mapDispatchToProps = {
  getCinemaListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
