import { IndexBar, List } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'umi';
// import {connect} from 'dva';
// import { connect } from 'umi';

interface CityModel {
  cityId: number;
  isHot: number; // 0 or 1
  name: string;
  pinyin: string;
}

interface CityRow {
  type: string;
  items: CityModel[];
}

function City(props: any) {
  const navigate = useNavigate();

  const [list, setList] = useState<CityRow[]>([]);

  const filterCity = (cities: CityModel[]): CityRow[] => {
    const letterArr: Array<string> = [];
    const newList: CityRow[] = [];
    for (let index = 65; index < 91; index++) {
      letterArr.push(String.fromCharCode(index));
    }
    console.log(
      cities.filter((item) => item.pinyin.substring(0, 1).toUpperCase() === 'A')
    );

    for (const value of letterArr) {
      const cityItems = cities.filter(
        (item) => item.pinyin.substring(0, 1).toUpperCase() === value
      );
      if (cityItems.length) {
        newList.push({
          type: value,
          items: cityItems
        });
      }
    }
    console.log(newList);

    return newList;
  };

  const changeCity = (item: CityModel) => {
    console.log(item);
    console.log(props);
    // 修改store state中的状态
    // props.dispatch({
    //   type: 'changeCity',
    //   payload: {
    //     cityName: item.name,
    //     cityId: item.cityId
    //   }
    // });
    navigate('/cinema');
  };

  useEffect(() => {
    fetch('https://m.maizuo.com/gateway?k=1552275', {
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16556233951665077216280577","bc":"110100"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.cities);
        setList(filterCity(res.data.cities));
      });
  }, []);
  return (
    <div>
      <IndexBar>
        {list.map((group) => {
          const { type, items } = group;
          return (
            <IndexBar.Panel index={type} title={type} key={type}>
              <List>
                {items.map((item, index) => (
                  <List.Item key={index} onClick={() => changeCity(item)}>
                    {item.name}
                  </List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          );
        })}
      </IndexBar>
    </div>
  );
}

// export default connect(() => ({}))(City);
export default City;
