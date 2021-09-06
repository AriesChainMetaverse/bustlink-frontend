// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function querySysUserList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminuser', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.username = response.data[i].username
      obj.nickname = response.data[i].nickname
      obj.phone = response.data[i].phone
      obj.name = response.data[i].name
      obj.sex = response.data[i].sex
      obj.email = response.data[i].email
      obj.status = response.data[i].status

      let newRole = [];
      response.data[i].edges.roles.forEach(e => {
        newRole.push(e.id)
      })
      obj.roles = newRole

    }else{
      obj.id = response.data[i].id
      obj.username = response.data[i].username
      obj.nickname = response.data[i].nickname
      obj.phone = response.data[i].phone
      obj.name = response.data[i].name
      obj.sex = response.data[i].sex
      obj.email = response.data[i].email
      obj.status = response.data[i].status
      obj.roles = []
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;
}


export async function queryRoleList() {

  const response = await request('/api/v0/adminrole', {
    method:"GET",
  });

  return response.data;
}



export async function removeSysUser(params: { ids: string[] }) {
  return request('/api/v0/adminuser', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSysUser(params: TableListParams) {
  params.status = Number(params.status)
  params.sex = Number(params.sex)
  return request('/api/v0/adminuser', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSysUser(params: TableListParams) {
  params.status = Number(params.status)
  params.sex = Number(params.sex)
  return request('/api/v0/adminuser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function bindRole(params: TableListParams) {
  return request('/api/v0/adminuser/bindrole', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}