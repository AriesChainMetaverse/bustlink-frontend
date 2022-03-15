// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryNodeGroupList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/node/group', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.name = response.data[i].name

      obj.introduction = response.data[i].introduction


      // let newPermission = [];
      // response.data[i].edges.permissions.forEach(e => {
      //   newPermission.push(e.id)
      // })
      // obj.permissions = newPermission

    }else{
      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.introduction = response.data[i].introduction

      // obj.permissions = []
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



export async function removeNodeGroup(params: { ids: string[] }) {
  return request('/api/v0/admin/node/group', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addNodeGroup(params: TableListParams) {
  return request('/api/v0/admin/node/group', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateNodeGroup(params: TableListParams) {
  return request('/api/v0/admin/node/group', {
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
