import { Effect, Reducer } from 'umi';
import { MenuDataItem } from '@ant-design/pro-layout';
import { query } from '@/services/menu';

export interface MenuModelState {
  menuData: MenuDataItem[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    saveMenuData: Reducer<MenuModelState>;
  };
}

//这里做了个转换，可能服务端返回的接口格式和前端的路由格式并不一致，可以在这个方法里进行调整，这里的方法仅作参考，根据自己实际情况进行调整即可
const menuFormatter = (response: any) => {
  if (response === null)
    return [];

  var re = response.map((item: { name: string; route: string; children: any; }) => {
    const result = {
      children: {},
      name: item.name,
      path: item.route === null ? '/' : item.route,
    };

    if (item.children) {
      result.children = menuFormatter(item.children);
    }

    return result;
  })

  return re;
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menuData: [],
  },

  effects: {
    *getMenuData(_, { put, call }) {
      const response = yield call(query);
      yield put({
        type: 'saveMenuData',
        payload: menuFormatter(response.data.viewMenu),
      });
    },
  },

  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
      };
    },
  },
};
export default MenuModel;
