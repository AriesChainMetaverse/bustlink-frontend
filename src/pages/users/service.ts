import request from 'umi-request';
import { UserListParams } from './data.d';

export async function queryUser(params?: UserListParams) {
  return request('/api/v0/users', {
    params,
  });
}

export async function removeUser(params: { key: number[] }) {
  return request('/api/v0/users', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addUser(params: UserListParams) {
  return request('/api/v0/users', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: UserListParams) {
  return request('/api/v0/users', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
