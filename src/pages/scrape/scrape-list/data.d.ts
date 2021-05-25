import { ContentItem } from '@/pages/content/content-list/data';

export interface ScrapeItemEdges {
  contents: ContentItem[];
}

export interface ScrapeItem {
  id?: number;
  name: string;
  check: boolean;
  need_scrape: boolean;
  force: boolean;
  media_exist: boolean;
  poster_exist: boolean;
  thumb_exist: boolean;
  content_id: string;
  upload_hash: string;
  upload_id: string;
  upload_state: string;
  media_sharpness: string;
  created_unix: number;
  updated_unix: number;
  edges: ScrapeItemEdges;
}

export interface ScrapeListItemDataType {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  total: number;
  data: ScrapeItem[];
}
