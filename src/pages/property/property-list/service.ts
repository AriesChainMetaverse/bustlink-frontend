import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryPropertyList(params?: TableListParams) {

  // 配合接口的分页变量名
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  params.page = params.current;
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/property', {
    method:"GET", params

  });

  return response;
}

export async function removeAnnounce(params: { ids: string[] }) {
  return request('/api/v0/admin/announce', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProperty(params: TableListParams) {
  return request('/api/v0/admin/property', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProperty(params: TableListParams) {
  return request(`/api/v0/admin/property/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
