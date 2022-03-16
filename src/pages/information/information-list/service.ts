import request from 'umi-request';
import {InfoItem} from "@/pages/information/information-list/data";

type InfoItemDataType = Partial<InfoItem>

export async function queryInformationList(params: { page: number; per_page: number;channel_name: string;channel_label: string;video_no: string}) {

  if (params.channel_name === "") {
    delete params.channel_name;
  }
  if (params.video_no === "") {
    delete params.video_no;
  }
  if (params.channel_label === "") {
    delete params.channel_label;
  }

  const response  = await request('/api/v0/informations', {
    params,
  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  // eslint-disable-next-line no-plusplus
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){

      obj.id = response.data[i].id
      obj.video_no = response.data[i].video_no
      obj.title = response.data[i].title
      obj.producer = response.data[i].producer
      obj.publisher = response.data[i].publisher
      obj.role = response.data[i].role
      obj.tags = response.data[i].tags
      obj.channel_id = response.data[i].channel_id
      obj.root = response.data[i].root
      obj.poster_path = response.data[i].poster_path

      obj.channel_label = response.data[i].edges.channels.label
      obj.channel_name = response.data[i].edges.channels.name


    }else{
      obj.id = response.data[i].id
      obj.video_no = response.data[i].video_no
      obj.title = response.data[i].title
      obj.producer = response.data[i].producer
      obj.publisher = response.data[i].publisher
      obj.role = response.data[i].role
      obj.tags = response.data[i].tags
      obj.channel_id = response.data[i].channel_id
      obj.root = response.data[i].root
      obj.poster_path = response.data[i].poster_path

      obj.channelLabel = ""
      obj.channelName = ""
    }
    newData.push(obj)
  }
  response.data = newData
  return response;

}

export async function queryInformation(params: { video_no?: string; per_page?: number }) {
  return request('/api/v0/informations', {
    params,
  });
}

export async function removeInformationItem(params: InfoItemDataType) {
  return request(`/api/v0/information/${params.id}`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function updateInformationItem(params: InfoItemDataType) {
  console.log("params is ",params)
  if (!Array.isArray( params.role)) {
    params.role =  params.role.split(",")
  }
  if (!Array.isArray( params.tags)) {
    params.tags =  params.tags.split(",")
  }
  return request(`/api/v0/information/`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryChannelList() {

  const response = await request('/api/v0/channels?per_page=100', {
    method:"GET",
  });

  return response.data;
}
