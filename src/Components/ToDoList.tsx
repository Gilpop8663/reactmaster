import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  IToDo,
  toDoCate,
  toDoSelector,
  toDoState,
  USERTODOLIST_KEY,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import loading from "../img/2.jpg";

const Container = styled.div`
  max-width: 500px;
  margin: 200px auto;
  background-color: #3a3f47;
  color: #eeeeee;
  height: 600px;
  border-radius: 15px;
  border: 1px solid white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlusButton = styled.button`
  position: absolute;
  margin-top: 450px;
  padding: 10px;
  border: none;
  background-color: #eeeeee;
  color: #3a3f47;
  border-radius: 50%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Select = styled.select`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  font-family: "Open Sans", "Helvetica Neue", "Segoe UI", "Calibri", "Arial",
    sans-serif;
  font-size: 18px;
  color: #60666d;
`;

function ToDoList() {
  // useEffect(() => {
  //   const userGetTodo = localStorage.getItem(USERTODOLIST_KEY);
  //   let toDosSave = useRecoilValue(toDoState);
  //   console.log(userGetTodo, "user임");
  //   if (localStorage.getItem(USERTODOLIST_KEY) !== null) {
  //     const parseTodo = JSON.parse(userGetTodo as string);
  //     toDosSave = parseTodo;
  //     //console.log("paseTODO 임", parseTodo);
  //   }
  //   return [
  //     toDosSave.map((todo) => {
  //       todo.id, todo.text, todo.category;
  //     }),
  //   ];
  // }, [toDosSave]);

  const toDos = useRecoilValue(toDoSelector);
  const [addBtn, setAddBtn] = useState(false);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddBtn((current) => !current);
  };
  const [category, setCategory] = useRecoilState(toDoCate);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  return (
    <Container>
      <Header>
        <Form action="">
          <Select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </Select>
        </Form>
        <Title>ToDo List</Title>
        {addBtn !== false && <CreateToDo />}
      </Header>
      <hr />
      <Content>
        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
        <PlusButton onClick={onClick}>
          <i className="fas fa-plus"></i>
        </PlusButton>
      </Content>
    </Container>
  );
}

export default ToDoList;
