export interface InfoItem {
  id: string;
  video_no: string;
  alias: string[];
  title: string;
  root: string;
  caption: string;
  poster: string;
  poster_path: string;
  thumb: string;
  thumb_path: string;
  sharpness: string;
  language: string;
  intro: string;
  last_update: number;
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
