export interface TableListItem {
  key: number;
  id: string;
  information_id: string;
  video_no: string;
  level: string;
  expired: string;
  service_port: string;
  addrs: string;
  fail_counts: string;

}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  id?: string;
  status?: string;
  name?: string;
  desc?: string;
  addrs: string;
  kind: string;
  title: string;
  content: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
