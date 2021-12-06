import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoProps, toDoState, USERTODOLIST_KEY } from "./atoms";
import Board from "./Components/Board";
import CreateDraggable from "./Components/CreateDraggable";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(250px, 1fr);
  gap: 10px;
  width: 100%;
`;

const Form = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 20px;
  border-radius: 15px;
`;

const Input = styled.input``;

const Button = styled.button``;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { draggableId, destination, source } = info;
    if (destination === null) {
      setToDos((allBoards) => {
        const newBoard = [...allBoards[source.droppableId]];
        newBoard.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: newBoard };
      });
    }
    if (!destination) return;
    //console.log(toDos);
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const newBoard = [...allBoards[source.droppableId]];
        //console.log(newBoard);
        const taskObj = newBoard[source.index];
        //console.log(taskObj);
        newBoard.splice(source.index, 1);
        newBoard.splice(destination?.index, 0, taskObj);
        //console.log(newBoard);
        return { ...allBoards, [source.droppableId]: newBoard };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const newBoard = [...allBoards[destination.droppableId]];
        const removeBoard = [...allBoards[source.droppableId]];
        const taskObj = removeBoard[source.index];
        removeBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, taskObj);
        //console.log(removeBoard);
        //console.log(toDos);

        return {
          ...allBoards,
          [source.droppableId]: removeBoard,
          [destination.droppableId]: newBoard,
        };
      });
    }
  };

  interface IAddBoard {
    board: string;
  }

  const onVaild = ({ board }: IAddBoard) => {
    console.log(board);
    const newBoard = { [board]: [] };
    console.log(newBoard);
    setToDos((allBoards) => {
      return { ...allBoards, ...newBoard };
    });
    console.log(localStorage.getItem(USERTODOLIST_KEY));
    setValue("board", "");
  };
  localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDos));
  return (
    <>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/5951a7bf3c.js"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <Form onSubmit={handleSubmit<IAddBoard>(onVaild)}>
        <Input
          {...register("board", { required: true, maxLength: 20 })}
          type="text"
          placeholder="Add a Board"
          maxLength={20}
        />
        <Button>Add Board</Button>
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}
export default App;
