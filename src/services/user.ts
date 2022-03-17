import request from '@/utils/request';
import {getPageQuery} from "@/utils/utils";
import {history} from "@@/core/history";
import {stringify} from "querystring";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  // return request('/api/currentUser');
  const token = localStorage.getItem("token")

  const response = await request('/api/v0/userbaseinfo', {
    method: 'GET',
    headers:{'Authorization': `Bearer ${token}`},
  });

  if(response.status !== "success"){
    const { redirect } = getPageQuery();
    localStorage.clear();
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }
  }else{
    //整理接口返回值符合Protable格式
    let obj = {};
    obj.name = response.data[0].username
    obj.avatar = response.data[0].avatar
    // response = obj
    console.log(response)
    return obj;
  }

}

export async function queryNotices(): Promise<any> {
  const token = localStorage.getItem("token")
  const response = await request('/api/v0/adminuser/notification', {
    method: 'GET',
    headers:{'Authorization': `Bearer ${token}`},
  });

  // 整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    obj.id = response.data[i].id
    obj.title = response.data[i].title
    obj.type = response.data[i].type
    if (response.data[i].read_at !== undefined && response.data[i].read_at !== ""){
      obj.read = true
    }
    if (response.data[i].title == "RemotePin Success"){
      obj.avatar = "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"
    }else if(response.data[i].title == "Add Information Success"){
      obj.avatar = "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
    }else{
      obj.avatar = "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"

    }
    obj.description = response.data[i].data
    obj.datetime = response.data[i].created_unix
    newData.push(obj)
  }

  response.data = newData
  return newData;
  // return request('/api/notices');
}
