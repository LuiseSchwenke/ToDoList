"use client"

import { useGlobalState } from '@/app/context/GlobalProvider';
import React, { useReducer } from 'react'
import {styled} from 'styled-components';

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?: string;
    borderRad?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
}

const ButtonStyled = styled.button`
    position:relative;
    display:flex;
    align:center;
    color:${(props) => props.theme.borderColor2};
    z-index:5;
    cursor:pointer;
    transition: all 0.5s ease-in-out;

    i{
        margin-right:1rem;
        color:${(props) => props.theme.borderColor2};
        font-size:1.5rem;

    }

    &:hover{
        color:white;
        i{
            color:white;
            transition: all 0.5s ease-in-out;

        }
    }

`;

function Button ({
    icon, 
    name,
    background,
    padding,
    borderRad,
    fw,fs, 
    click,
    type,
    border} : Props) {

    const {theme} = useGlobalState();

  return (
    <ButtonStyled 
        type={type}
        style={{
            background: background,
            padding: padding || "0.5rem 1rem",
            borderRadius: borderRad || "0.5rem",
            fontWeight: fw || "500",
            fontSize: fs,
            border: border || "none",
        }}
        theme={theme} 
        onClick={click}
    
    >
        {icon && icon}
        {name}
    </ButtonStyled>
  )
}



export default Button