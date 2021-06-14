export interface InstructListItem {
  id: number;
  rid: string;
  type: string;
  state: string;
  updated_unix: bigint;
  created_unix: bigint;
}

export interface InstructListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface InstructListData {
  list: InstructListItem[];
  pagination: Partial<InstructListPagination>;
}

export interface InstructListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
