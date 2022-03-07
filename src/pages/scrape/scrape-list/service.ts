import request from 'umi-request';
import { ScrapeItem, ScrapeListItemDataType } from './data.d';

interface ParamsType extends Partial<ScrapeListItemDataType> {
  page?: number;
  per_page: number;
}

export async function queryScrapeList(params: ParamsType) {
  return request('/api/v0/client/scrapes', {
    params,
  });
}

interface ScrapeItemDataType extends Partial<ScrapeItem> {}

export async function removeScrape(params: ScrapeItemDataType) {
  return request(`/api/v0/client/scrape/${params.id}`, {
    method: 'DELETE',
  });
}

export async function uploadScrapes(params: string[]) {
  const { ...restParams } = params;
  return request(`/api/v0/client/scrapes/upload`, {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function uploadScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/client/scrape/${params.id}/upload`, {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function pushScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/client/scrape/${params.id}/push`, {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}


export async function updateScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/client/scrape/${params.id}`, {
    method: 'PUT',
    data: {
      ...restParams,
    },
  });
}

export async function addScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request('/api/v0/client/scrape', {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function startScrape() {

  return request(`/api/v0/client/scrape/start`, {
    method: 'POST',
  });
}

export async function stopScrape() {

  return request(`/api/v0/client/scrape/stop`, {
    method: 'POST',
  });
}

export async function syncRemotePin() {
  return request(`/api/v0/client/remotepin`, {
    method: 'GET',
  });
}
