import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../Routes/Utils.js";
import {observer} from "mobx-react-lite";

const NavBar = observer (() => {

    const {user} = useContext(Context)
    const navigate = useNavigate();

    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth ?

                    <Nav className="ml-auto">
                        <Button
                            variant={"outline-warning"}
                            onClick={()=>navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={()=>logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;