import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request('/api/v0/tagmapping/upload', {
    method: 'POST',
    data: params,
  });
}

