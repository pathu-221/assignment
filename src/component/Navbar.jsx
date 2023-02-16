import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { FaCircle} from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
function NavBar() {
  return (
    <Navbar bg='secondary' className='custom-navbar' variant='light'>
      <Container className='custom-containercontainer justify-content-start'>
        <Navbar.Brand><FaCircle/></Navbar.Brand>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle />
      </Container>
      <Container className='justify-content-end custom-container'>
        <AiFillHome />
        Logout
      </Container>

    </Navbar>
  )
}

export default NavBar