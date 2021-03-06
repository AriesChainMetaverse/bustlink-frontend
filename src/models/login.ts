import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import {fakeAccountLogin, fakeUserBaseInfo,fakeSystemProperty} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      // Login successfully
      // console.log(response)
      if (response.access_token !== undefined) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        // 登录成功后，将token存储到localStorage中
        localStorage.setItem("token",response.access_token)
        localStorage.setItem("refresh_token",response.refresh_token)

        // 登录成功后通过token获取用户基本信息
        const response1 = yield call(fakeUserBaseInfo, response.access_token);
        if(response1.data == undefined){
          message.error('😖 😖 😖  登录失败！');
          return;
        }
        yield put({
          type: 'changeLoginStatus',
          payload: response1,
        });
        localStorage.setItem("name",response1.data[0].username)
        localStorage.setItem("is_admin",response1.data[0].is_admin)

        // 获取系统配置信息
        const response2 = yield call(fakeSystemProperty, 'InformationImgUrl');
        if(response2.status === "success"){
          localStorage.setItem("InformationImgUrl",response2.data[0].value)
        }

        message.success('🎉 🎉 🎉  登录成功！');

        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }else{
        message.error('😖 😖 😖  登录失败！');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      localStorage.clear();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // if (payload.data[0].is_admin){
        setAuthority("admin");
      // }else{
      //   setAuthority("user");
      // }
      return {
        ...state,
        // status: payload.status,
        // type: payload.type,
      };
    },
  },
};

export default Model;
