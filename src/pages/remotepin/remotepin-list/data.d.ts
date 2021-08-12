export interface TableListItem {
  key: number;
  id: string;
  information_id: string;
  video_no: string;
  intro: string;
  title: string;
  root: string;
  poster_path: string;
  rid: string;
  step: string;
  status: string;
  relate: string;
  name: string;
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
  rid?: string;
  step?: string;
  relate?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
