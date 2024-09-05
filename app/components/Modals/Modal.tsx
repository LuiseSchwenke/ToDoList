"use client"

import { useGlobalState } from '@/app/context/GlobalProvider'
import React from 'react'
import styled from 'styled-components';

const ModalStyled = styled.div`
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.45);
        filter: blur(4px);
        z-index: 50;
    }

    .modal-content {
        position: relative;
        padding: 2rem;
        z-index: 100;
        max-width: 630px;
        width: 100%;
        background-color: ${(props) => props.theme.colorGrey5};
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        margin: 1rem; 
        max-height: calc(100vh - 2rem);
        overflow-y: auto;
    }
`;

interface Props {
    content: React.ReactNode;
}

const Modal = ({ content }: Props) => {
    const { closeModal } = useGlobalState();
    const { theme } = useGlobalState();

    return (
        <ModalStyled theme={theme}>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">{content}</div>
        </ModalStyled>
    );
}

export default Modal;
