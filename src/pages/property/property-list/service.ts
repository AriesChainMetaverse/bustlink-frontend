import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryPropertyList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminproperty', {
    method:"GET", params

  });

  return response;
}

export async function removeAnnounce(params: { ids: string[] }) {
  return request('/api/v0/adminannounce', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProperty(params: TableListParams) {
  return request('/api/v0/adminproperty', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProperty(params: TableListParams) {
  return request(`/api/v0/adminproperty/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
