export interface User {
  animeFileList: string | null;
  animeFormat: string[];
  animeList: string | null;
  animePreferences: string[];
  avatar: string;
  id: string;
  name: string;
  userToRecommend: string;
}

export interface Room {
  name: string;
  description: string;
  background: string;
  startDate: Date | null;
  endDate: Date | null;
  users: string[];
}

export interface AnimeGenre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}
