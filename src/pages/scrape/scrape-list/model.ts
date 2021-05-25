import type { Effect, Reducer } from 'umi';
import { addScrape, queryScrapeList, removeScrape, updateScrape, uploadScrape } from './service';
import type { ScrapeListItemDataType } from './data.d';

export interface StateType {
  itemList?: ScrapeListItemDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    update: Effect;
    fetch: Effect;
    upload: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    updateScrape: Reducer<StateType>;
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndScrapeList',
  state: {},

  effects: {
    * update({ payload }, { call, put }) {
      const response = yield call(updateScrape, payload);
      console.log(response.code);
      if (response.code === 0) {
        yield put({
          type: 'appendList',
          payload: response.body,
        });
      } else {
        yield put({
          type: 'appendList',
          payload: [],
        });
      }
    },
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryScrapeList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    * appendFetch({ payload }, { call, put }) {
      const response = yield call(queryScrapeList, payload);
      if (response.status === 200) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        yield put({
          type: 'queryList',
          payload: [],
        });
      }
    },
    * upload({ payload }, { call, put }) {
      const response = yield call(uploadScrape, payload);
      console.log(response.status);
      if (response.status === 200) {
        yield put({
          type: 'appendList',
          payload: response,
        });
      } else {
        yield put({
          type: 'appendList',
          payload: [],
        });
      }


    },
    * submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeScrape : updateScrape;
      } else {
        callback = addScrape;
      }
      const response = yield call(callback, payload);
      if (response.code === 0) {
        yield put({
          type: 'queryList',
          payload: response.body,
        });
      } else {
        yield put({
          type: 'queryList',
          payload: [],
        });
      }
    },
  },

  reducers: {
    updateScrape(state, action) {
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
  },
};

export default Model;
