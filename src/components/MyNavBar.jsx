import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FaHome } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { useNavigate } from 'react-router';
export const MyNavBar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <Navbar    bg="dark" data-bs-theme="dark">
        <Container id='nav-tarolo'>
          <div>
            <FaHome size={35} onClick={()=>navigate("/")}/>
            <RiFilePaper2Line size={35} onClick={()=>navigate("/topics")}/>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}