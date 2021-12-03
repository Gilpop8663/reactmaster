import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export const USERTODOLIST_KEY = "todos";

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

const userGetTodo = localStorage.getItem(USERTODOLIST_KEY);
const parseTodo = JSON.parse(userGetTodo as string);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: userGetTodo !== null ? parseTodo : [],
});

export const toDoCate = atom<Categories>({
  key: "toDoCate",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const toDoCategory = get(toDoCate);
    return toDos.filter((todo) => todo.category === toDoCategory);
  },
});
