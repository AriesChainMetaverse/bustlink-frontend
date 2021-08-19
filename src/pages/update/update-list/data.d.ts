export interface TableListItem {
  key: number;
  id: string;
  os: string;
  video_no: string;
  link: string;
  kind: string;
  title: string;
  rid: string;

  detail: string;
  forcibly: boolean;
  truncate: boolean;
  publish: boolean;
  arch: string;
  version: string;
  filename: string;
  attr: string;
  crc32: string;

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
  // link: string;
  // kind: string;
  title?: string;
  detail?: string;
  forcibly?: boolean;
  truncate?: boolean;
  publish?: boolean;
  arch?: string;
  version?: string;
  filename?: string;
  attr?: string;
  rid?: string;
  crc32?: string;
  os?: string;
  // content: string;
  key?: number;
  pageSize?: number;
  page?: number;
  per_page?: number;
  currentPage?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
