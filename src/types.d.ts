export interface User {
  animeFileList: string | null;
  animeFormat: string[];
  animeList: string | undefined;
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
  users: User[] | undefined;
}

export interface AnimeGenre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}
