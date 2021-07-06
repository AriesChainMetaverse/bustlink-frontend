import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryInforList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admininformations', {
    method:"GET", params

  });

  //整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      console.log(response.data[i].edges.admin_tops)
      obj.id = response.data[i].id
      obj.status = response.data[i].status
      obj.video_no = response.data[i].edges.informationsV1.video_no
      obj.title = response.data[i].edges.informationsV1.title


    }else{
      obj.id = response.data[i].id
      obj.video_no = ""
      obj.title = ""
      obj.status = response.data[i].status

    }
    newData.push(obj)
  }
  response.data = newData
  // console.log(response)
  return response;
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateInforList(params: { ids: string[],status: string  }) {
  return request(`/api/v0/admininformations/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
