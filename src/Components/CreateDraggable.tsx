import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ISnapshot {
  isDragging: boolean;
}

const Card = styled.div<ISnapshot>`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#AEE1E1" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

interface IDraggableProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function CreateDraggable({ toDoId, toDoText, index }: IDraggableProps) {
  //console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(CreateDraggable);
