"use client"

import { useGlobalState } from '@/app/context/GlobalProvider';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/Button';
import { plus } from '@/app/Utils/icons';

const CreateContentStyled = styled.form`

    >h1{
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight:600;
        
    }

    .input-control{
        position:relative;
        margin: 1.6rem 0;
        font-weight:500;

        label{
            margin-bottom:0.5rem;
            display:inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);

            span{
                color: ${(props) => props.theme.colorGrey2};
            }
        }

        input,textarea{
        width:100%;
        padding:1rem;
        resize:none;
        background-color:${(props) => props.theme.colorbg4};
        color:white;
        border:0.5rem;
    }
    }

    .submit-btn button {
    color:white;
        i{
            color:white;
        }
    }

    .toggler{
        display:flex;
        align-items:center;
        justify-content:space-between;
        
        label{
            flex: 1;
            cursor:pointer;
        }
        input{
            width: initial;
        }
    }

`;

function CreateContent() {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false); 
    const {theme, allTasks, closeModal} = useGlobalState();

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            case "important":
                setImportant(e.target.checked);
                break;
            default: 
            break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date: new Date(date).toISOString(), 
            completed,
            important,
        };

        try {
            const res = await axios.post("/api/tasks", task)
            if (res.data.error) {
                toast.error(res.data.error);
            }
            
            toast.success("Task got creted successfully");
            allTasks();
            closeModal();
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error:", error);
        }
    }

    return <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a Task</h1>
        <div className="input-control">	
            <label htmlFor="title">Title</label>
            <input type='text' 
                    id='title' 
                    value={title} 
                    name='title' 
                    onChange={handleChange("title")}
                    placeholder='Make a coffee'
                />
        </div>

        <div className="input-control">	
            <label htmlFor="description">Description</label>
            <textarea
                    id='description' 
                    value={description} 
                    name='description' 
                    onChange={handleChange("description")}
                    placeholder='Brew water and mix'
            ></textarea>
        </div>

        <div className="input-control">	
            <label htmlFor="date">Date</label>
            <input  type='date'
                    id='date' 
                    value={date} 
                    name='date' 
                    onChange={handleChange("date")}
            />
        </div>

        <div className="input-control toggler">	
            <label htmlFor="completed">Completed</label>
            <input  type='checkbox'
                    id='completed' 
                    checked={completed}
                    
                    name='completed'
                    onChange={handleChange("completed")}
            />
        </div>

        <div className="input-control toggler">	
            <label htmlFor="important">Important</label>
            <input  type='checkbox'
                    id='important' 
                    checked={important}
                    name='important' 
                    onChange={handleChange("important")}
            />
        </div>

        <div className="submit-btn flex justify-end">
            <Button 
            type='submit'
            name='Create New Task' 
            icon={plus}
            padding={"0.8rem 2rem"}
            background={theme.greenDark}
            borderRad={"0.8rem"}
            fw={"500"}
            fs={"1.2rem"}
            />

        </div>
    </CreateContentStyled>

}

export default CreateContent