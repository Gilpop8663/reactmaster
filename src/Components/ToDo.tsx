import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

// const Button = styled.button<{ isDone: boolean }>`
//   border-bottom: ${(props) => (props.isDone === false ? 15 : 0)} white;
//   color: white;
// `;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  border: none;
  background-color: #01adb5;
  margin-left: 10px;
  i {
    width: 100%;
  }
`;

const List = styled.li`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  align-items: center;
  span {
    font-size: 20px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  // const [isDone, setIsDone] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  //const toDosSave = useRecoilValue(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // setIsDone((current) => !current);
    setToDos((oldToDos) => {
      const findIndex = oldToDos.findIndex((todo) => todo.id === id);
      //const oldToDo = oldToDos[findIndex];
      const newToDo = { id, text, category: name as IToDo["category"] };
      //console.log(oldToDo, newToDo);
      const newToDos = [...oldToDos];
      newToDos.splice(findIndex, 1, newToDo);
      //console.log(newToDos);
      //console.log(newToDo);
      //console.log(oldToDos.splice(findIndex, 1, newToDo as any));
      return newToDos;
    });
    //console.log(name);
  };
  //   useEffect(() => {
  //     localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDosSave));
  //   }, [toDosSave]);
  const deleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const findIndex = oldToDos.findIndex((todo) => todo.id === id);
      return [
        ...oldToDos.slice(0, findIndex),
        ...oldToDos.slice(findIndex + 1),
      ];
    });
  };
  return (
    <List>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <Button name={Categories.TO_DO} onClick={onClick}>
          <i className="far fa-check-square"></i>
        </Button>
      )}
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          <i className="fas fa-hourglass-half"></i>
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          <i className="fas fa-check"></i>
        </Button>
      )}
      <Button name={Categories.DELETE} onClick={deleteClick}>
        <i className="fas fa-trash-alt"></i>
      </Button>
    </List>
  );
}

export default ToDo;
