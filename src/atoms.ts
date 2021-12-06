import { atom } from "recoil";

export interface ItoDoStateProps {
  [key: string]: IToDoProps[];
}

export interface IToDoProps {
  id: number;
  text: string;
}

export const USERTODOLIST_KEY = "todos";
const userGetTodo = localStorage.getItem(USERTODOLIST_KEY);
const parseTodo = JSON.parse(userGetTodo as string);

export const toDoState = atom<ItoDoStateProps>({
  key: "toDos",
  default: userGetTodo !== null ? parseTodo : {},
});
