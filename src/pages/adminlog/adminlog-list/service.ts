// import request from 'umi-request';
import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryAdminLogList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  if (params.startTime != undefined && params.startTime){
    var startTime = new Date(params.startTime);
    params.startTime = Date.parse(startTime)/1000;
  }

  if (params.endTime != undefined && params.endTime) {
    var endTime = new Date(params.endTime);
    params.endTime = Date.parse(endTime) / 1000;
  }
  const response = await request('/api/v0/admin/log', {
    method:"GET", params

  });

  return response;
}

// export async function removeAdminLog(params: { ids: number[] }) {
//   return request('/api/v0/admin/log', {
//     method: 'DELETE',
//     data: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }
//
// export async function addAdminLog(params: TableListParams) {
//   return request('/api/v0/admin/log', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'post',
//     },
//   });
// }
//
// export async function updateAdminLog(params: TableListParams) {
//   return request(`/api/v0/admin/log/${params.id}`, {
//     method: 'PUT',
//     data: {
//       ...params,
//     },
//   });
// }
