export interface TableListItem {
  key: number;
  id: string;
  information_id: string;
  video_no: string;
  intro: string;
  lower_banner: string;
  title: string;
  top_right: number;
  category: array;
  name: string;
  poster_path: string;
  root: string;
  page_id: string;

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
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  information_id?: string;
  title?: string;
  intro?: string;
  lower_banner?: string;
  top_right?: number;
  category?: array;
  per_page?: number;
  page?: number;
  current?: number;
}
