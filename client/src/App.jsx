import {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./main.jsx";
import {check} from "./api/userAPI.js";
import {Spinner} from "react-bootstrap";



const App =observer (() => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        check().then(data=>{
            user.setUser(true);
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, [])

    if(loading){
        return <Spinner animation={'grow'} />
    }

  return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            {/*<Toaster position={"top-right"}/>*/}
        </BrowserRouter>
  )
});

export default App
