import request from 'umi-request';
import type { ContentItem } from '@/pages/content/content-list/data';

interface ContentRequestParamsType extends Partial<any> {
  page?: number;
  per_page: number;
}

type ContentItemDataType = Partial<ContentItem>

export async function queryContentList(params: ContentRequestParamsType) {
  return request('/api/v0/contents', {
    params,
  });
}

export async function removeContent(params: ContentItemDataType) {
  return request(`/api/v0/content/${params.id}`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addFakeList(params: ContentRequestParamsType) {
  const { page = 1, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      page,
    },
    data: {
      ...restParams,
    },
  });
}

export async function updateFakeList(params: ContentRequestParamsType) {
  const { page = 1, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'PUT',
    params: {
      page,
    },
    data: {
      ...restParams,
    },
  });
}

export async function updateContent(params: ContentItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/content/${params.id}`, {
    method: 'PUT',
    data: {
      ...restParams,
    },
  });
}
