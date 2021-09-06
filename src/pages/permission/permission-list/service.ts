// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryPermissionList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminpermission', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.comment = response.data[i].comment
      obj.title = response.data[i].title

      let newMenu = [];
      if(response.data[i].edges.menus !== "" && response.data[i].edges.menus !== undefined && JSON.stringify(response.data[i].edges.menus) !== "{}") {
        response.data[i].edges.menus.forEach(e => {
          newMenu.push(e.id)
        })
      }
      obj.menus = newMenu

      let newApi = [];
      if(response.data[i].edges.apis !== "" && response.data[i].edges.apis !== undefined && JSON.stringify(response.data[i].edges.apis) !== "{}"){
        response.data[i].edges.apis.forEach(e => {
          newApi.push(e.id)
        })
      }
      obj.apis = newApi

    }else{
      obj.id = response.data[i].id
      obj.name = response.data[i].name
      obj.comment = response.data[i].comment
      obj.title = response.data[i].title

      obj.menus = []
      obj.apis = []
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;
}


export async function queryMenuList() {

  const response = await request('/api/v0/adminmenu?per_page=100', {
    method:"GET",
  });

  return response.data;
}

export async function queryAPIList() {

  const response = await request('/api/v0/adminapi?per_page=100', {
    method:"GET",
  });

  return response.data;
}


export async function removePermission(params: { ids: string[] }) {
  return request('/api/v0/adminpermission', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPermission(params: TableListParams) {

  return request('/api/v0/adminpermission', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updatePermission(params: TableListParams) {

  return request('/api/v0/adminpermission', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function bindMenu(params: TableListParams) {
  return request('/api/v0/adminpermission/bindmenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function bindAPI(params: TableListParams) {
  return request('/api/v0/adminpermission/bindapi', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}