export interface TableListItem {
  key: number;
  id: string;
  information_id: string;
  video_no: string;
  link: string;
  kind: string;
  title: string;
  content: string;

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
  link: string;
  kind: string;
  title: string;
  content: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
