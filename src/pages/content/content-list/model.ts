import type { Effect, Reducer } from 'umi';
import { queryContentList, updateContent } from './service';
import type { ContentListItemDataType } from './data.d';

export interface StateType {
  list?: ContentListItemDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    update: Effect;
    fetch: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    updateContent: Reducer<StateType>;
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndContentList',

  state: {},

  effects: {
    * update({ payload }, { call, put }) {
      const response = yield call(updateContent, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryContentList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * appendFetch({ payload }, { call, put }) {
      const response = yield call(queryContentList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * submit({ payload }, { call }) {
      yield call(updateContent, payload); // post
    },
  },

  reducers: {
    updateContent(state, action) {
      return {
        ...state,
        scrape: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
