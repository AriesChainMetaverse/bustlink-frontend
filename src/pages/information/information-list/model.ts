import {Effect, Reducer} from 'umi';
import {queryInformationList} from './service';
import {InfoListItemDataType} from "@/pages/information/information-list/data";

export interface StateType {
  list: InfoListItemDataType | null;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listInformationList',

  state: {
    list: null,
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryInformationList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(action.payload)
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
