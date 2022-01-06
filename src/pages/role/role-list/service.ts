// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryRoleList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/role', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.status = response.data[i].status
      obj.comment = response.data[i].comment
      obj.sort = response.data[i].sort
      obj.flag = response.data[i].flag
      obj.dataScope = response.data[i].dataScope

      let newPermission = [];
      response.data[i].edges.permissions.forEach(e => {
        newPermission.push(e.id)
      })
      obj.permissions = newPermission

    }else{
      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.status = response.data[i].status
      obj.comment = response.data[i].comment
      obj.sort = response.data[i].sort
      obj.flag = response.data[i].flag
      obj.dataScope = response.data[i].dataScope
      obj.permissions = []
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;
}


export async function queryPermissionList() {

  const response = await request('/api/v0/admin/permission?per_page=100', {
    method:"GET",
  });

  return response.data;
}



export async function removeRole(params: { ids: string[] }) {
  return request('/api/v0/admin/role', {
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
  return request('/api/v0/admin/role', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRole(params: TableListParams) {
  params.status = Number(params.status)
  params.sort = Number(params.sort)
  return request('/api/v0/admin/role', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function bindPermission(params: TableListParams) {
  return request('/api/v0/admin/role/bindpermission', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
