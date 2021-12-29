// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryMenuList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/menu', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.parent_id = response.data[i].parent_id
      obj.comment = response.data[i].comment
      obj.path = response.data[i].path
      obj.depth = response.data[i].depth
      obj.parent_name = response.data[i].edges.parent.name


    }else{
      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.parent_id = response.data[i].parent_id
      obj.comment = response.data[i].comment
      obj.path = response.data[i].path
      obj.depth = response.data[i].depth

      obj.parent_name = ""
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;
}


export async function querySelectMenuList(parentID) {

  const response = await request(`/api/v0/admin/menu?parent_id=${parentID}`, {
    method:"GET",
  });

  return response.data;
}



export async function queryPermissionList() {

  const response = await request('/api/v0/admin/permission?per_page=100', {
    method:"GET",
  });

  return response.data;
}

export async function removeMenu(params: { ids: string[] }) {
  return request('/api/v0/admin/menu', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMenu(params: TableListParams) {

  return request('/api/v0/admin/menu', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMenu(params: TableListParams) {

  return request('/api/v0/admin/menu', {
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
