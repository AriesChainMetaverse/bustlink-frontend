import request from 'umi-request';
import {InfoItem} from "@/pages/information/clientInformation-list/data";

type InfoItemDataType = Partial<InfoItem>

export async function queryInformationList(params: { page: number; per_page: number }) {
  return request('/api/v0/client/informations', {
    params,
  });
}

export async function queryInformation(params: { video_no?: string; per_page?: number }) {
  return request('/api/v0/client/informations', {
    params,
  });
}

export async function removeInformationItem(params: InfoItemDataType) {
  return request(`/api/v0/client/information/${params.id}`, {
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
  return request(`/api/v0/client/information/`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
