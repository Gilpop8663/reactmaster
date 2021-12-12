import { atom } from "recoil";
import { IMovie } from "./api";

export const nowMovies = atom<IMovie[]>({
  key: "nowMovies",
  default: [],
});
