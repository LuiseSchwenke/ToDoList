"use client"

import React from 'react'
import {edit, deleteBtn} from '@/app/Utils/icons';
import styled from 'styled-components';
import formateDate from '@/app/Utils/formateDate'
import { useGlobalState } from '@/app/context/GlobalProvider';
import CreateContent from '../Modals/CreateContent';


const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius:1rem;
    background: #3A3A3A;
    border: 2px solid ${(props) => props.theme.borderColor2};

    height:16rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;

    .date{
        margin-top: auto;
    }

    >h1 {
        font-size:1.5rem;
        font-weight:600;
    }

    .task-footer {
        display: flex;
        align-items:center;
        gap:1.2rem;
    }

    button {
        border: none;
        outline: none;
        cursor:pointer;

        i {
            font-size: 1.4rem;
            color: ${(props) => props.theme.colorGrey2};
        }
    }

    .edit{
        margin-left:auto;
    }

    .completed, .incomplete {
        display: inline-block;
        padding: 0.4rem 1rem;
        background: #fe6854;
        border-radius:30px;
    }

    .completed{
        background: #50C878;
    }
`;

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
}

function TaskItem ({title, description, date, isCompleted, isImportant, id}: Props) {
    const {deleteTask, updateTask} = useGlobalState();
    return (<TaskItemStyled>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className='date'>{formateDate(date)}</p>
            <div className="task-footer">
                {isCompleted ? (<button className='completed' onClick={() => {
                    const task = {
                        id,
                        isCompleted: !isCompleted,
                    };
                    updateTask(task);
                }}>
                    Completed</button>) 
                : (<button className='incomplete' onClick={() => {
                    const task = {
                        id,
                        isCompleted: !isCompleted,
                    };
                    updateTask(task);
                }}>Incomplete</button> )}
                
                <button className="edit">{edit}</button>
                <button className="delete" onClick={() => {
                    deleteTask(id);
                }}>{deleteBtn}</button>
            </div>

        </TaskItemStyled>
)}


export default TaskItem