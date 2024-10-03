export interface User {
  id: string;
  name: string;
  avatar: string;
  animeFormat: string[];
  animePreferences: string[];
  animeDislikes: string[];
  animeListURL: string;
  roomId: string;
}

export interface Room {
  id: string;
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
