import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryUpdateList(params?: TableListParams) {

  // 配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminupdate', {
    method:"GET", params

  });

  return response;
}

export async function removeUpdate(params: { ids: string[] }) {
  return request('/api/v0/adminupdate', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUpdate(params: TableListParams) {

  return request('/api/v0/adminupdate', {
    method: 'POST',
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   "Accept": "application/json",
    //   "type": "formData"
    // },
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUpdate(params: TableListParams) {
  return request(`/api/v0/adminupdate/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
