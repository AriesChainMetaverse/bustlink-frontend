import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/v0/adminuser/permissions');      // 这里是服务端的获取菜单的地址，根据自己情况进行调整
}
