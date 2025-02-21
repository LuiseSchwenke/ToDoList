"use client"
import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode;
}

const GlobalStyles = styled.div`
  padding:2.5rem;
  display:flex;
  gap:2.5rem;
  height:100%
  transition: all 0.3s ease-in-out;

  @media screen && (max-width:768px) {
    padding: 1rem;
    gap: 1rem;
  }

  .grid{
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(30px, 1fr));
    gap:1.5rem;
  }
  

  }
  `;


const GlobalStylesProvider = ({children}: Props) => {
  return <GlobalStyles>{children}</GlobalStyles>
  
};

export default GlobalStylesProvider;