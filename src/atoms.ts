import { useQuery } from "react-query";
import { atom } from "recoil";
import { getMoviesPage1, getMoviesPage2, IGetVideosProps, IMovie } from "./api";

export const nowMovies = atom<IMovie[]>({
  key: "nowMovies",
  default: [],
});

export const nowPathName = atom({
  key: "nowPath",
  default: "/",
});
