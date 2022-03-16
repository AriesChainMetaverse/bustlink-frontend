export interface InfoItem {
  id: string;
  video_no: string;
  title: string;
  producer: string;
  publisher: string;
  role: string;
  tags: string;
  channel_id: string;
  channel_label: string;
  channel_name: string;
}

export interface InfoListItemDataType {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  data: InfoItem[];
}
