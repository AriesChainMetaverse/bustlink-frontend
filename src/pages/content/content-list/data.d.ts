export interface ContentActor {
  name: string;
}

export interface ContentGenre {
  content: string;
}

export interface ContentItemEdges {
  actors: ContentActor[];
  genres: ContentGenre[];
}

export interface ContentItem {
  id: string;
  from: string;
  video_no: string;
  title: string;
  publisher: string;
  year: string;
  release_date: string;
  studio: string;
  director: string;
  movie_set: string;
  plot: string;
  caption: string;
  intro: string;
  language: string;
  scrap_id: number;
  uncensored: boolean;
  edges: ContentItemEdges;
  updated_at: number;
  created_at: number;
  deleted_at: number;
}

export interface ContentListItemDataType {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  total: number;
  data: ContentItem[];
}
