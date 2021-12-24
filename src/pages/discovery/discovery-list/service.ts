// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function querDiscoveryList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/discovery', {
    method:"GET", params

  });


  // 整理接口返回值符合Protable格式

  // eslint-disable-next-line no-plusplus
  for(let i = 0; i < response.data.length; i++) {
    if(response.data[i].links === undefined){
      response.data[i].links = []
    }
  }


  return response;
}

export async function removeDiscovery(params: { ids: number[] }) {
  return request('/api/v0/admin/discovery', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDiscovery(params: TableListParams) {

  if(params.links !== undefined && params.links.length>0){
    params.links = params.links.split(",");
  }else{
    params.links = null
  }
  return request('/api/v0/admin/discovery', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDiscovery(params: TableListParams) {

  if(params.links !== undefined && params.links.length>0){
    params.links = params.links.split(",");
  }else{
    params.links = null
  }


  return request(`/api/v0/admin/discovery/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
