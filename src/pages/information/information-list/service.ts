import request from 'umi-request';

export async function queryInformationList(params: { page: number; per_page: number }) {
  return request('/api/v0/informations', {
    params,
  });
}

export async function queryInformation(params: { video_no?: string; per_page?: number }) {
  return request('/api/v0/informations', {
    params,
  });
}
