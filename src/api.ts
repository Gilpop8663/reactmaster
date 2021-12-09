const API_KEY = "8ada0ba81365b222c17dc83dc8b3e61d";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
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

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
