import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryAdminInstructList(params?: TableListParams) {

  // 配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/instructlist', {
    method:"GET", params

  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      // console.log(response.data[i].edges.information_info)
      obj.id = response.data[i].id
      obj.pid = response.data[i].pid
      obj.rid = response.data[i].rid
      obj.information_id = response.data[i].information_id
      obj.type = response.data[i].type
      obj.action = response.data[i].action
      obj.updated_unix = response.data[i].updated_unix

      if(response.data[i].edges.information_info !== "" && response.data[i].edges.information_info !== undefined && JSON.stringify(response.data[i].edges.information_info) !== "{}"){
        obj.title = response.data[i].edges.information_info.title
        obj.video_no = response.data[i].edges.information_info.video_no
      }

      if(response.data[i].edges.update_info !== "" && response.data[i].edges.update_info !== undefined && JSON.stringify(response.data[i].edges.update_info) !== "{}"){
        obj.title = response.data[i].edges.update_info.title
        obj.video_no = response.data[i].edges.update_info.filename
      }

      // let newAdminNodes = [];
      // obj.nodes = []
      // if(response.data[i].edges.nodes !== "" && response.data[i].edges.nodes !== undefined && JSON.stringify(response.data[i].edges.nodes) !== "{}"){
      //     response.data[i].edges.nodes.forEach(e => {
      //       newAdminNodes.push(e.id)
      //     })
      //     obj.nodes = newAdminNodes
      // }



    }else{
      obj.id = response.data[i].id
      obj.pid = response.data[i].pid
      obj.rid = response.data[i].rid
      obj.information_id = response.data[i].information_id
      obj.type = response.data[i].type
      obj.action = response.data[i].action
      obj.updated_unix = response.data[i].updated_unix
      obj.title = ""
      obj.video_no = ""
      // obj.nodes = []
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;s


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

export async function updateAdminInstruct(params: { ids: string[],action: string  } ) {
  return request(`/api/v0/admin/instruct`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryAdminNoteList() {

  const response = await request('/api/v0/node?per_page=100', {
    // const response = await request('/api/v0/node?is_current=1&per_page=100', {
    method:"GET",
  });

  return response.data;
}
export async function syncInstruct(params: TableListParams) {
  return request(`/api/v0/admin/instruct/${params.rid}`, {
    method: 'PUT',
    data: {
      // ...params,
    },
  });
}
