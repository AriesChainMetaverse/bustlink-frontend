import request from 'umi-request';
import { ScrapeItem, ScrapeListItemDataType } from './data.d';

interface ParamsType extends Partial<ScrapeListItemDataType> {
  page?: number;
  per_page: number;
}

export async function queryScrapeList(params: ParamsType) {
  return request('/api/v0/scrapes', {
    params,
  });
}

interface ScrapeItemDataType extends Partial<ScrapeItem> {}

export async function removeScrape(params: ScrapeItemDataType) {
  return request(`/api/v0/scrape/${params.id}`, {
    method: 'DELETE',
  });
}

export async function uploadScrapes(params: string[]) {
  const { ...restParams } = params;
  return request(`/api/v0/scrapes/upload`, {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function uploadScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/scrape/${params.id}/upload`, {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function updateScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request(`/api/v0/scrape/${params.id}`, {
    method: 'PUT',
    data: {
      ...restParams,
    },
  });
}

export async function addScrape(params: ScrapeItemDataType) {
  const { ...restParams } = params;
  return request('/api/v0/scrape', {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function startScrape() {

  return request(`/api/v0/startscrape`, {
    method: 'GET',
  });
}

export async function stopScrape() {

  return request(`/api/v0/stopscrape`, {
    method: 'GET',
  });
}
