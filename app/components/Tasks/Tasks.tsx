"use client";
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react'
import styled from 'styled-components'
import CreateContent from '../Modals/CreateContent';
import TaskItem from '../TaskItem/TaskItem';
import {plus} from '@/app/Utils/icons';
import Modal from '../Modals/Modal';

const TasksStyled = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.colorbg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks{
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.greenDark};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed white;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: white;
    }
  }
`;


interface Props {
  title: string,
  tasks: any[],

}

const Tasks = ({title, tasks = []} : Props) => {
    const {theme,isLoading, openModal, modal } = useGlobalState();
    
  return (

    <TasksStyled theme={theme}>
      {modal && <Modal content={<CreateContent/>} />}
      <h1>{title}</h1>
    <div
  className="tasks grid"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    
  }}
>      {tasks.map((task) => (
          <TaskItem key={task.id}
          title= {task.title}
          description= {task.description}
          date= {task.date}
          isCompleted= {task.isCompleted}
          isImportant= {task.important}
          id={task.id}
          />
        ))}
        <button className="create-task" onClick={openModal}>
          {plus}
          Add New Task
        </button>
      </div>
     
    </TasksStyled>
  )
}


export default Tasks