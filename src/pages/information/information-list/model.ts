import {Effect, Reducer} from 'umi';
import {queryInformationList, updateInformationItem} from './service';
import {InfoListItemDataType} from "@/pages/information/information-list/data";
import {Modal} from "antd";

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
    * submit({payload}, {call, put}) {
      const response = yield call(updateInformationItem, payload);
      if (response.status === "success"){
        Modal.success({
          content: response.message,
        });

      }else{
        Modal.error({
          content: response.message,
        });
      }

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
