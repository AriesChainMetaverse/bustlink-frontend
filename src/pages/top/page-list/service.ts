// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryPageList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/page', {
    method:"GET", params

  });


  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      // console.log(response.data[i].edges.information_info)
      obj.id = response.data[i].id
      obj.title = response.data[i].title
      obj.featured_index = response.data[i].featured_index
      obj.featured_content = response.data[i].featured_content
      obj.parent_id = response.data[i].parent_id
      obj.parent_title = response.data[i].edges.parent.title

    }else{
      obj.id = response.data[i].id
      obj.title = response.data[i].title
      obj.featured_index = response.data[i].featured_index
      obj.featured_content = response.data[i].featured_content
      obj.parent_id = response.data[i].parent_id
      obj.parent_title = ""
    }
    newData.push(obj)
  }
  response.data = newData











  return response;
}

export async function removePage(params: { ids: number[] }) {
  return request('/api/v0/admin/page', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPage(params: TableListParams) {
  params.featured_index = Number(params.featured_index)
  return request('/api/v0/admin/page', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updatePage(params: TableListParams) {
  params.featured_index = Number(params.featured_index)
  return request(`/api/v0/admin/page/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryParentPageList() {

  const response = await request('/api/v0/admin/page?per_page=100', {
    method:"GET",
  });

  return response.data;
}
