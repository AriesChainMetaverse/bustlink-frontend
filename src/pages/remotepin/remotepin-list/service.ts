import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryAdminPinList(params?: TableListParams) {

  // 配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/adminpin', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      console.log(response.data[i].edges.admin_tops)
      obj.id = response.data[i].id
      obj.rid = response.data[i].rid
      obj.status = response.data[i].status
      obj.step = response.data[i].step
      obj.relate = response.data[i].relate
      obj.video_no = response.data[i].edges.pinInformation.video_no
      obj.title = response.data[i].edges.pinInformation.title


      obj.poster_path = response.data[i].edges.pinInformation.poster_path

    }else{
      obj.id = response.data[i].id
      obj.rid = response.data[i].rid
      obj.video_no = ""
      obj.title = ""
      obj.status = response.data[i].status
      obj.step = response.data[i].step
      obj.relate = response.data[i].relate
      obj.poster_path = ""

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

export async function updateAdminPin(params: TableListParams) {
  return request(`/api/v0/adminpin/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function syncAdminPin() {
  return request(`/api/v0/syncadminpin`, {
    method: 'GET',
  });
}
