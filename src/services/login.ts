import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/v0/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function fakeUserBaseInfo(token: string) {
  return request('/api/v0/auth/userbaseinfo', {
    method: 'GET',
    headers:{'Authorization': `Bearer ${token}`},
  });
}
