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
    let newData =[];
    for(let i = 0; i < response.data.length; i++) {
      let obj = {};
      if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
        obj.id = response.data[i].id
        obj.pid = response.data[i].pid
        obj.type = response.data[i].type
        obj.state = response.data[i].state
        obj.serial = response.data[i].serial
        obj.last_online = response.data[i].last_online
        obj.addrs = response.data[i].addrs
        obj.admin_node_group_adminnodegroup = response.data[i].edges.groupowner.id
        obj.group_name = response.data[i].edges.groupowner.name

      }else{
        obj.id = response.data[i].id
        obj.pid = response.data[i].pid
        obj.type = response.data[i].type
        obj.state = response.data[i].state
        obj.serial = response.data[i].serial
        obj.last_online = response.data[i].last_online
        obj.addrs = response.data[i].addrs
        obj.admin_node_group_adminnodegroup = "00000000-0000-0000-0000-000000000000"
        obj.group_name = "-"

      }
      newData.push(obj)
    }
    response.data = newData

    return response;
  }
  return null;
}

export async function queryNodeGroupList() {

  const response = await request('/api/v0/admin/node/group?per_page=100', {
    method:"GET",
  });

  return response.data;
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
  return request(`/api/v0/admin/node/`, {
    method: 'POST',
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
