// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryRoleList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminrole', {
    method:"GET", params

  });

  return response;
}

export async function removeRole(params: { ids: string[] }) {
  return request('/api/v0/adminrole', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRole(params: TableListParams) {
  params.status = Number(params.status)
  params.sort = Number(params.sort)
  return request('/api/v0/adminrole/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRole(params: TableListParams) {
  return request('/api/v0/adminrole/edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
