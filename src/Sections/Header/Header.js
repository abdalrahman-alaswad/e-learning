import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Header = () => {
    const navigate = useNavigate()
    const [isToken, setIsToken] = useState(Cookies.get("userToken"))
    const logOutHandler = () => {
        Cookies.remove("userToken")
        Cookies.remove("userRole")
        Cookies.remove("userName")
        Cookies.remove("userId")
        navigate("/SignInUp")
    }
    return (
        <>
            <Navbar bg="light" expand="lg" className='navbar-e'>
                <Container>
                    <Navbar.Brand href="#home" className='navbar-bra'>E-Larning</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className='nav-e'>
                            <Nav.Link href="#home" className='a'>Home</Nav.Link>
                            <Nav.Link href="#about" className='a'>About</Nav.Link>
                            <Nav.Link href="#service" className='a'>Service</Nav.Link>
                            <Nav.Link href="#testmonial" className='a'>Testmonial</Nav.Link>
                            <Nav.Link href="#anoucment" className='a'>Anoucment</Nav.Link>
                            {isToken ?
                                <NavDropdown title="Profile" id="nav-dropdown" >
                                    <NavDropdown.Item className='a' href='/Profile'>
                                        Profile</NavDropdown.Item>
                                    <NavDropdown.Item className='a' onClick={() => logOutHandler()} >
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                                : <NavDropdown title="Join Us" id="nav-dropdown" >
                                    <NavDropdown.Item className='a' href='/SignInUp'>
                                        Sign Up</NavDropdown.Item>
                                    <NavDropdown.Item className='a' href='/SignInUp' >
                                        Sign In
                                    </NavDropdown.Item>
                                </NavDropdown>}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header