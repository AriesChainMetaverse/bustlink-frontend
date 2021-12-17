import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryBootstrapList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/bootstrap', {
    method:"GET", params

  });


  // 整理接口返回值符合Protable格式
  for(let i = 0; i < response.data.length; i++) {
    if(response.data[i].expired === undefined){
      response.data[i].expired = false
    }
  }

  console.log(response)


  return response;
}

export async function removeAnnounce(params: { ids: number[] }) {
  return request('/api/v0/admin/announce', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addBootstrap(params: TableListParams) {

  //
  params.addrs = params.addrs.split(",");
  params.expired = Boolean(params.expired);
  params.service_port = Number(params.service_port);
  params.fail_counts = 0;


  return request('/api/v0/bootstrap', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateBootstrap(params: TableListParams) {

  params.addrs = params.addrs.split(",");
  params.expired = Boolean(params.expired);
  params.service_port = Number(params.service_port);


  return request(`/api/v0/bootstrap/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
