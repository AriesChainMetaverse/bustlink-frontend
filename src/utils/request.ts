/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import {response} from "express";
import {history} from "@@/core/history";
import {stringify} from "querystring";
import jwt_decode from "jwt-decode";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if(response.status === 401){
      localStorage.clear()
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};


/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// /**
//  * 配置request拦截器 增加头部token
//  */
//
// request.interceptors.request.use(async (url, options) => {
//
//   if(url.indexOf("/oauth2/token") === -1){
//
//     if(url === '/api/v0/admin/organization' && options.method === 'post'){
//       return
//     }
//
//     const token=localStorage.getItem("token")
//     const decodeToken=jwt_decode(token);
//     const {exp}=decodeToken;
//     const expTime= exp*1000;
//     const nowTime= 1641902965000;
//     console.log( expTime)
//     console.log( nowTime)
//     //过期，刷新token
//     if( nowTime >= expTime){
//       console.log("reflesh token")
//
//       // eslint-disable-next-line @typescript-eslint/no-shadow
//       const response = await request(`/oauth2/token?client_id=000000&client_secret=999999&scope=all&grant_type=refresh_token&refresh_token=${localStorage.getItem("refresh_token")}`, {
//         method: 'GET',
//       });
//       console.log(response)
//
//       if (response.status === 200) {
//         // 登录成功后，将token存储到localStorage中
//         localStorage.setItem("token",response.data.access_token)
//         localStorage.setItem("refresh_token",response.data.refresh_token)
//         console.log("reflesh token done")
//       }
//     }
//
//
//     if (
//       options.method === 'post' ||
//       options.method === 'put' ||
//       options.method === 'delete' ||
//       options.method === 'get'
//     ) {
//       const headers = {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization:`Bearer ${localStorage.getItem("token")}`
//       };
//       return {
//         url,
//         options: { ...options, headers },
//       };
//   }
//
//   }
// });

/**
 * 配置request拦截器 增加头部token
 */
request.interceptors.request.use(async (url, options) => {

  if(url.indexOf("/oauth2/token") === -1){

    if(url === '/api/v0/admin/organization' && options.method === 'post'){
      return
    }

    if (
      options.method === 'post' ||
      options.method === 'put' ||
      options.method === 'delete' ||
      options.method === 'get'
    ) {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:`Bearer ${localStorage.getItem("token")}`
      };
      return {
        url,
        options: { ...options, headers },
      };
    }

  }
});

export default request;
