import request from 'umi-request';
import {InfoItem} from "@/pages/information/information-list/data";

type InfoItemDataType = Partial<InfoItem>

export async function queryInformationList(params: { page: number; per_page: number }) {
  return request('/api/v0/informations', {
    params,
  });
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
