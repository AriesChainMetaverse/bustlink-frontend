import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryNodeList(params?: TableListParams) {

  if(params !== undefined){
    // 配合接口的分页变量名
    // eslint-disable-next-line no-param-reassign
    params.page = params.current;
    // eslint-disable-next-line no-param-reassign
    params.per_page = params.pageSize;

    const response = await request('/api/v0/admin/node', {
      method:"GET", params

    });

    // 整理接口返回值符合Protable格式
    // var location = [];
    // var lArr = [];
    // var response2;
    // for(let i = 0; i < response.data.length; i++) {
    //   location = [];
    //   if(response.data[i].addrs === undefined){
    //     response.data[i].addrs = []
    //     response.data[i].location = []
    //   }else{
    //
    //     for(let j = 0; j < response.data[i].addrs.length; j++) {
    //
    //       lArr = response.data[i].addrs[j].split("/")
    //
    //       // eslint-disable-next-line no-await-in-loop
    //       if(isValidIP(lArr[2])){
    //         response2 = await getlocationByIP(lArr[2])
    //         if(response2.data[0] !== undefined){
    //           location.push(response2.data[0])
    //         }
    //       }
    //
    //     }
    //
    //     response.data[i].location = location
    //   }
    //
    // }


    return response;
  }
  return null;
}

export async function removeNode(params: { ids: string[] }) {
  return request('/api/v0/admin/node', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addAnnounce(params: TableListParams) {
  return request('/api/v0/admin/announce', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateNode(params: TableListParams) {
  return request(`/api/v0/node/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function getlocationByIP(ipaddress: string) {

  const response = await request(`/api/v0/location?ip=${ipaddress}`, {
    method:"GET",
  });
  return response;

}

export function isValidIP(ip: string)
{
  if(ip === "127.0.0.1"){
    return false
  }

  if(ip.indexOf("192.168") !== -1){
    return false
  }

  const reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}
