import request from 'umi-request';
import { UserListParams } from './data.d';

export async function queryUser(params?: UserListParams) {
  // return request('/api/v0/users', {
  //   params,
  // });


  const response = await request('/api/v0/users', {
    method:"GET", params
  });
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      obj.name = response.data[i].name
      obj.avatar = response.data[i].avatar
      obj.serial = response.data[i].edges.adminnodes[0].serial
      obj.nickname = response.data[i].nickname
      obj.level = response.data[i].level
      obj.status = response.data[i].status

    }else{
      obj.name = ""
      obj.avatar = ""
      obj.serial = ""
      obj.nickname = ""
      obj.level = ""
      obj.status = ""
    }
    newData.push(obj)
  }
  response.data = newData
  // console.log(response)
  return response;

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
