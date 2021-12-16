// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryAnnounceList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/announce', {
    method:"GET", params

  });

  return response;
}

export async function removeAnnounce(params: { ids: number[] }) {
  return request('/api/v0/admin/announce', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addAnnounce(params: TableListParams) {
  return request('/api/v0/admin/announce', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateAnnounce(params: TableListParams) {
  return request(`/api/v0/admin/announce/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
