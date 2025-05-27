import React, {use, useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../Routes/Utils.js";
import {login, registration} from "../api/userAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const click = async () =>{
     try {
         let data;
         if(isLogin) {
             data = await login(email, password);
         } else {
             data = await registration(email, password);
         }
         navigate(SHOP_ROUTE);
     } catch (e){
          alert(e.response.data.message);
     }
      user.setUser(user);
      user.setIsAuth(true)
    }


    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54 }}
        >

            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder={"Введите ваш email...."}
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder={"Введите ваш пароль...."}
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Row className="d-flex w-auto flex-row justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                        <div style={{maxWidth: "50%"}}>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                            :
                        <div style={{maxWidth: "50%"}}>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                        }
                        <Button
                            className="w-auto"
                            variant="outline-success"
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;