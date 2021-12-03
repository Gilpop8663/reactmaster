import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoCate, toDoState, USERTODOLIST_KEY } from "../atoms";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  font-family: "Open Sans", "Helvetica Neue", "Segoe UI", "Calibri", "Arial",
    sans-serif;
  font-size: 18px;
  color: #60666d;
`;

function CreateToDo() {
  const toDosSave = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(toDoCate);
  const { register, handleSubmit, setValue } = useForm();
  const handleVaild = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ]);
    //console.log(JSON.stringify(toDosSave));
    setValue("toDo", "");
  };
  localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDosSave));
  return (
    <form onSubmit={handleSubmit(handleVaild)} action="">
      <Input
        {...register("toDo", { required: "Please write a To Do" })}
        type="text"
        placeholder="write your to do"
      />
    </form>
  );
}

export default CreateToDo;
