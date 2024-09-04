"use client"
import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/GlobalProvider';
import Image from 'next/image';
import menu from '@/app/Utils/menu';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../Button/Button';
import { logout } from '@/app/Utils/icons';
import { useClerk } from '@clerk/nextjs';

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorbg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGray3};

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 1; /* Change to be above the image */
      background: ${(props) => props.theme.colorbg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      opacity: 0.2;
      border: 2px solid white;
    }

    h1 {
      display: flex;
      flex-direction: column;
      line-height: 1;
      z-index: 2;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;
      width: 70px;
      height: 70px;
      z-index: 2; /* Ensure image is above the overlay */
      
      img {
        transition: all 0.5s ease;
        border-radius: 100%;
        z-index: 2; /* Ensure img tag is above the overlay */
      }
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
        z-index: 0; /* Ensure the overlay is behind the image */
      }

      .image {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    padding: 0.9rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0rem;
    display:grid;
    grid-template-columns: 40px 1fr;
    cursor:pointer;
    position:relative;
    z-index: 2;
    align-items:center;

    &::after {
      position:absolute;
      content:"";
      top:0;
      left:0;
      width:0;
      height:100%;
      z-index:1;
      background-color:${(props) => props.theme.activeNavLinkHover};
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position:absolute;
      content:"";
      top:0;
      left:0;
      width:0;
      height:100%;
      z-index:1;
      background-color:${(props) => props.theme.greenDark};
      transition: all 0.3s ease-in-out;
      border-bottom-left-radius:5px;
      border-top-left-radius:5px;
    }

    a{
      font-weight:500;
      transition: all 0.3s ease-in-out;
      z-index: 3;
      line-height:0;
    }

    i{
      display:flex;
      align-items:center;
    }

    &:hover{
      &::after{
        width:100%;
      }
    }
  }

  .active{
    background-color:${(props) => props.theme.activeNavLink};

  }
  
  .active::before{
    width:0.3rem;
  }

  >button {
    margin:1.5rem;
  }

`;

function Sidebar() {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const {signOut} = useClerk();

  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src="/me.png" alt='profile' />
        </div>
        <h1>
          <span>Firstname </span>
          <span>Lastname</span>
        </h1>
      </div>
      <ul className='nav-items'>
        {menu.map((item) => {
          const link = item.link;
          return (
            <li key={link} className={`nav-item ${pathname === link ? "active" : ""}`}
                onClick={() => {
                  handleClick(link);
                }}>
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
      <Button
        name={"Sign Out"}
        type={"submit"}
        padding={"0.4rem 0.8rem"}
        borderRad={"0.8rem"}
        fw={"500"}
        fs={"1.2rem"}
        icon={logout}
        click={() => {
          signOut(() => {router.push("/signin")});
        }}
      />
      </div>
      
    </SidebarStyled>
  );
}

export default Sidebar;
