import { observer } from 'mobx-react';
import useStores from '../../store';

function Index({ type, value, children, ...props }) {
  const { layout } = useStores();
  const { menuList } = layout;

  const checkoutPermission = (targetArr, targetValue, key) => {
    let flag = false;
    for (let i = 0; i < targetArr.length; i++) {
      const item = targetArr[i];
      if (item[key] === targetValue) {
        flag = true;
        break;
      }
    }

    return flag;
  };

  return checkoutPermission(type === 'menu' ? menuList : [], value, 'newEmsPath') ? children : null;
}

export default observer(Index);
