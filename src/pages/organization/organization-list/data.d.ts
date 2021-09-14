export interface TableListItem {
  key: number;
  id: string;
  comment: string;
  data_scope: string;
  flag: string;
  name: string;
  title: string;
  content: string;
  status: number;
  sort: number;
  corporate_name: string;
  corporate_hash: string;
  corporate_legal_user: string;
  corporate_id_card_facade: string;
  corporate_id_card_obverse: string;
  corporate_code: string;
  business_license: string;
  is_verify: string;

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
  status?: number;
  sort?: number;
  flag?: string;
  data_scope?: string;
  comment: string;
  name: string;
  title: string;
  content: string;
  key?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  is_verify: string;
}
