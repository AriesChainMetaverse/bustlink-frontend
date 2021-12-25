import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryInforList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admin/informations', {
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
      obj.root = response.data[i].edges.informationsV1.root
      obj.poster_path = response.data[i].edges.informationsV1.poster_path
      obj.frames_particulars = response.data[i].frames_particulars


    }else{
      obj.id = response.data[i].id
      obj.video_no = ""
      obj.title = ""
      obj.status = response.data[i].status
      obj.root = ""
      obj.poster_path = ""
      obj.frames_particulars = response.data[i].frames_particulars
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
  return request(`/api/v0/admin/informations/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function initCreateAdminInfor() {
  return request(`/api/v0/admin/initinformations/`, {
    method: 'POST',
  });
}

export async function updateAdminInformationFrames(params: TableListParams) {
  const { ...restParams } = params;

  // 处理跳帧图片数据格式
  let newFrameParticipants =[];
  for(let i = 0; i < params.frames_particulars.length; i++) {
    console.log(params.frames_particulars[i])
    let obj = {};
    obj.index = Number(params.frames_particulars[i].index)
    obj.time = Number(params.frames_particulars[i].time)
    obj.row = Number(params.frames_particulars[i].row)
    obj.column = Number(params.frames_particulars[i].column)
    obj.caption = params.frames_particulars[i].caption
    console.log(obj)
    newFrameParticipants.push(obj)
  }

  restParams.frames_particulars = newFrameParticipants

  return request(`/api/v0/admin/informations/${params.id}`, {
    method: 'PUT',
    data: {
      ...restParams,
    },
  });
}
