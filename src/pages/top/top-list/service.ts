import request from 'umi-request';
import { TableListParams } from './data.d';


export async function queryTopList(params?: TableListParams) {

  //配合接口的分页变量名
  params.page = params.current;
  params.per_page = params.pageSize;

  const response = await request('/api/v0/admintoplist', {
    method:"GET", params

  });

  //整理接口返回值符合Protable格式
  let newData =[];
  for(let i = 0; i < response.data.length; i++) {
    let obj = {};
    if(response.data[i].edges !== "" && response.data[i].edges !== undefined && JSON.stringify(response.data[i].edges) !== "{}"){
      console.log(response.data[i].edges.admin_tops)
      obj.id = response.data[i].id
      obj.video_no = response.data[i].video_no
      obj.root = response.data[i].root
      obj.poster_path = response.data[i].poster_path
      obj.title = response.data[i].edges.admin_tops[0].title
      obj.intro = response.data[i].edges.admin_tops[0].intro
      obj.lower_banner = response.data[i].edges.admin_tops[0].lower_banner
      obj.top_right = response.data[i].edges.admin_tops[0].top_right

      let newCategory = [];
      response.data[i].edges.admin_tops.forEach(e => {
        newCategory.push(e.category)
      })
      obj.category = newCategory

    }else{
      obj.id = response.data[i].id
      obj.video_no = response.data[i].video_no
      obj.root = response.data[i].root
      obj.poster_path = response.data[i].poster_path
      obj.title = ""
      obj.intro = ""
      obj.lower_banner = "none"
      obj.top_right = "none"
      obj.category = []
    }
    newData.push(obj)
  }
  response.data = newData
  console.log(response)
  return response;
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTopList(params: TableListParams) {
  return request(`/api/v0/admintoplist/${params.information_id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
