import type { Effect, Reducer } from 'umi';
import { queryChannel, queryChannelInfos, updateChannel } from './service';
import type { ChannelListItemDataType } from './data.d';
import { InfoListItemDataType } from '@/pages/information/information-list/data';

export interface StateType {
  itemList?: ChannelListItemDataType;
}

export interface InfoStateType {
  itemList?: InfoListItemDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchInfos: Effect;
    fetch: Effect;
    submit: Effect;
  };
  reducers: {
    updateChannelData: Reducer<StateType>;
    queryList: Reducer<StateType>;
    queryInfoList: Reducer<InfoStateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndChannelList',
  state: {},

  effects: {
    * fetchInfos({ payload }, { call, put }) {
      const response = yield call(queryChannelInfos, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryChannel, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * submit({ payload }, { call }) {
      yield call(updateChannel, payload); // post
    },
  },

  reducers: {
    updateChannelData(state, action) {
      return {
        ...state,
        itemList: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        itemList: action.payload,
      };
    },
    queryInfoList(state, action) {
      return {
        ...state,
        itemList: action.payload,
      };
    },
  },
};

export default Model;
