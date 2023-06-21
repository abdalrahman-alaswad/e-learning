import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';




const Header = () => {
    const navigate = useNavigate()
    const [isToken, setIsToken] = useState(Cookies.get("userToken"))
    const [IMG, setImg] = useState()
    const logOutHandler = () => {
        Cookies.remove("userToken")
        Cookies.remove("userRole")
        Cookies.remove("userName")
        Cookies.remove("userId")
        navigate("/SignInUp")
    }
    useEffect(() => {
        axios.get(`https://awesomeapp-1-e9667851.deta.app/user/id/${Cookies.get("userId")}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
                setImg(res.data.avatar)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log(IMG)
    return (
        <>
            <Navbar bg="light" expand="lg" className='navbar-e' sticky="top">
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
                                <NavDropdown title={(<img src={IMG} width="30px" height="30px" style={{ borderRadius: "100%" }} />)} id="nav-dropdown" >
                                    <NavDropdown.Item className='a' href='/e-learning/Profile'>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='a' onClick={() => logOutHandler()} >
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                                : <NavDropdown title="Join Us" id="nav-dropdown" >
                                    <NavDropdown.Item className='a' href='/e-learning/SignInUp'>
                                        Sign Up</NavDropdown.Item>
                                    <NavDropdown.Item className='a' href='/e-learning/SignInUp' >
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