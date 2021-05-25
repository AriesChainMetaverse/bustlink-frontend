import type { UserItem } from '@/pages/users/data';
import type { InfoItem } from '@/pages/information/data';

export interface ChannelItemEdges {
  users: UserItem[];
  infos: InfoItem[];
}

export interface ChannelItem {
  id: number;
  name: string;
  label: string;
  created_unix: number;
  edges: ChannelItemEdges;
  // name: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: string;
  // updatedAt: Date;
  // createdAt: Date;
  // progress: number;
}

export interface ChannelListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ChannelListItemDataType {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  total: number;
  data: ChannelItem[];
}

