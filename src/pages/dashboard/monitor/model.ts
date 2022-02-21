import { Effect, Reducer } from 'umi';

import { TagType,MonitorDataType } from './data.d';
import { queryTags ,queryMonitorData} from './service';

export interface StateType {
  tags: TagType[];
  monitordata: MonitorDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTags: Effect;
    fetchMonitorData: Effect;
  };
  reducers: {
    saveTags: Reducer<StateType>;
    saveMonitorData: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dashboardAndmonitor',

  state: {
    tags: [],
    monitordata: {
      NodeCnt:1000,
      OnlineNodeCnt:1000,
      PinCnt:1000,
      LastInformation:""
    }
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
    *fetchMonitorData(_, { call, put }) {
      const response = yield call(queryMonitorData);
      yield put({
        type: 'saveMonitorData',
        payload: response.data[0],
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },

    saveMonitorData(state, action) {
      console.log(action.payload)
      return {
        ...state,
        monitordata: action.payload,
      };
    },
  },
};

export default Model;
