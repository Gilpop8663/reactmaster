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

export interface IGetVideoProps {
  id: number;
  results: [
    {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      official: boolean;
      published_at: string;
      site: string;
      size: number;
      type: string;
    }
  ];
}

export interface IGetMovieDetail {
  data: object;

  dataUpdatedAt: number;
  errorUpdatedAt: number;
  failureCount: number;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: [
      {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        official: boolean;
        published_at: string;
        site: string;
        size: number;
        type: string;
      }
    ];
  };
}

export interface IMovieCredit {
  cast: ICast[];
  crew: ICrew[];
  id: number;
}

interface ICast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface ICrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ISimilarMovie {
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
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=3`
  ).then((response) => response.json());
}

export function getMoviesPage3() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=5`
  ).then((response) => response.json());
}

export function getMoviesPage4() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=10`
  ).then((response) => response.json());
}

export function getMoviesPage5() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=12`
  ).then((response) => response.json());
}

export function getMoviesPage6() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=14`
  ).then((response) => response.json());
}

export function topRateMoviePage1() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
export function topRateMoviePage2() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=3`
  ).then((response) => response.json());
}
export function topRateMoviePage3() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=5`
  ).then((response) => response.json());
}

export function topRateMoviePage4() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=7`
  ).then((response) => response.json());
}
export function topRateMoviePage5() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=9`
  ).then((response) => response.json());
}
export function topRateMoviePage6() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=11`
  ).then((response) => response.json());
}

export function getVideo(id: string) {
  return fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

export function getMovieDetail(id: string) {
  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
  ).then((response) => response.json());
}

export function getMovieCredit(id: string) {
  return fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

export function getSimilarMovie(id: string) {
  return fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}
