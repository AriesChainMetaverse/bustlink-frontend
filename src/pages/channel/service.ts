import request from 'umi-request';
import { ChannelItem } from '@/pages/channel/data';
import { InfoFormValueType } from '@/pages/channel/components/AddInfoForm';

interface ChannelListRequestParams extends Partial<any> {
  id?: number;
  video_no?: string;
  page?: number;
  per_page: number;
  desc?: string;
  key?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}

interface ChannelRequestParams extends Partial<ChannelItem> {
}

export async function queryChannel(params: ChannelListRequestParams) {
  return request('/api/v0/channels', {
    params,
  });
}

export async function queryChannelInfos(params: ChannelListRequestParams) {
  return request(`/api/v0/channel/${params.id}/infos`, {
    params,
  });
}

export async function queryChannelAddInfos(params: ChannelListRequestParams) {
  return request(`/api/v0/channel/${params.id}/infos/add`, {
    method: 'GET',
    params,
  });
}

export async function removeChannel(params: { key: number[] }) {
  return request('/api/v0/channel', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addChannelInfos(params: InfoFormValueType) {
  return request(`/api/v0/channel/${params.id}/infos`, {
    method: 'POST',
    data: {
      ...params.infoIDs,
    },
  });
}


export async function removeChannelInfos(params: InfoFormValueType) {
  return request(`/api/v0/channel/${params.id}/infos`, {
    method: 'DELETE',
    data: {
      ...params.infoIDs,
    },
  });
}

export async function removeAllChannelInfos(params: InfoFormValueType) {
  return request(`/api/v0/channel/${params.id}/infos/clear`, {
    method: 'DELETE',
  });
}

export async function addChannel(params: ChannelRequestParams) {
  return request('/api/v0/channel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateChannel(params: ChannelRequestParams) {
  return request('/api/v0/channel', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

interface ChannelTransferSyncRequestParams extends Partial<ChannelItem> {
}

export async function channelSyncTransferInfo(params: ChannelTransferSyncRequestParams) {
  // if (params.id === undefined) {
  //   return request(`/api/v0/sync/transfer`, {
  //     method: 'POST',
  //     params,
  //   });
  // }
  return request(`/api/v0/sync/transfer`, {
    method: 'POST',
    params,
  });
}

export async function channelSyncInstructInfo(params: ChannelTransferSyncRequestParams){
  return request(`/api/v0/sync/instruct`, {
    method: 'POST',
    params,
  });
}
