import request from 'umi-request';

export async function queryTags() {
  return request('/api/tags');
}

export async function queryMonitorData() {
  return request('/api/v0/admin/monitordata');
}

export async function getAdminsGeoData() {
  return request('/api/v0/admin/monitor/location');
}
