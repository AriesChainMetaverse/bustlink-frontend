import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryNodeList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/node', {
    method:"GET", params

  });

  return response;
}

export async function removeAnnounce(params: { ids: number[] }) {
  return request('/api/v0/adminannounce', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addAnnounce(params: TableListParams) {
  return request('/api/v0/adminannounce', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateNode(params: TableListParams) {
  return request(`/api/v0/node/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}