import { useQuery } from "react-query";
import { atom } from "recoil";
import { getMoviesPage1, getMoviesPage2, IGetMoviesProps, IMovie } from "./api";

const nowPage1 = useQuery<IGetMoviesProps>(
  ["movies", "nowPlayingPage1"],
  getMoviesPage1
);
const nowPage2 = useQuery<IGetMoviesProps>(
  ["movies", "nowPlayingPage2"],
  getMoviesPage2
);

export const nowMovies = atom<IMovie[]>({
  key: "nowMovies",
  default: [],
});
