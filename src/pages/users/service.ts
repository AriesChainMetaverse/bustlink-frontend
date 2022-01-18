import request from 'umi-request';
import { UserListParams } from './data.d';

export async function queryUser(params?: UserListParams) {
  // return request('/api/v0/users', {
  //   params,
  // });


  const response = await request('/api/v0/admin/users', {
    method:"GET", params
  });
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      obj.id = response.data[i].id
      obj.username = response.data[i].username
      obj.avatar = response.data[i].avatar
      obj.serial = response.data[i].edges.adminnodes[0].serial
      obj.nickname = response.data[i].nickname
      obj.telephone = response.data[i].telephone
      obj.email = response.data[i].email
      obj.telephone_state = response.data[i].telephone_state
      obj.email_state = response.data[i].email_state
      obj.username_state = response.data[i].username_state
      obj.level = response.data[i].level
      obj.state = response.data[i].state

    }else{
      obj.id = ""
      obj.username = ""
      obj.avatar = ""
      obj.serial = ""
      obj.nickname = ""
      obj.level = ""
      obj.state = ""
      obj.telephone = ""
      obj.email = ""
      obj.telephone_state = ""
      obj.email_state = ""
      obj.username_state = ""

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

export async function updateUser(params: UserListParams) {
  params.level = Number(params.level)
  return request(`/api/v0/admin/users/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
