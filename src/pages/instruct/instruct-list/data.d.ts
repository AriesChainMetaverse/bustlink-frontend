export interface TableListItem {
  id: number;
  rid: string;
  nodes: string[];
  type: string;
  state: string;
  updated_unix: bigint;
  created_unix: bigint;
  information_id: string;
  action: string;
  name: string;
  video_no: string;
  intro: string;
  title: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface InstructListData {
  list:  TableListItem[];
  pagination: Partial< TablePagination>;
}

export interface TableListParams {
  id?: number;
  pid?: string;
  rid?: string;
  type?: string;
  information_id?: string;
  instruct_id?: string;
  action?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  page?: number;
  current?: number;
  per_page?: number;
}
