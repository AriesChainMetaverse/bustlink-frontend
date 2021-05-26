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
