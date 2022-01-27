// import request from '@/utils/request';
import request from 'umi-request';
import Base64  from 'base-64';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  const basicAuth = Base64.encode(params.username + ":" + params.password)
  return request('/oauth2/token?client_id=000000&client_secret=999999&scope=all&grant_type=password', {
    method: 'GET',
    headers:{'Authorization': `Basic ${basicAuth}`},
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function fakeUserBaseInfo(token: string) {
  return request('/api/v0/userbaseinfo', {
    method: 'GET',
  });
}
export async function fakeSystemProperty(key: string) {
  return request(`/api/v0/property/${key}`, {
    method: 'GET',
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},
  });
}

