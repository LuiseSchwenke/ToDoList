"use client"
import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from '@/app/context/GlobalProvider'
import Image from 'next/image'
import menu from '@/app/Utils/menu'
import Link from 'next/link'

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props => props.theme.sidebarWidth)};
  background-color: ${(props => props.theme.colorbg2)};
  border: 1px solid ${(props => props.theme.borderColor2)};
  border-radius: 2rem;
`

function Sidebar() {
  const { theme } = useGlobalState();

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
        <Image width={70} height={70} src="/me.png" alt='profile'/>
        </div>
        <h1>
          <span>Fistname </span>
          <span>Lastname</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          return <li className={`nav-item`} onClick={() => {
            handleClick(item.link);
          }}>
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        })}
      </ul>
    </SidebarStyled>
  );
}

export default Sidebar;
