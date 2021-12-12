const API_KEY = "8ada0ba81365b222c17dc83dc8b3e61d";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesProps {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMoviesPage1() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getMoviesPage2() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`
  ).then((response) => response.json());
}
