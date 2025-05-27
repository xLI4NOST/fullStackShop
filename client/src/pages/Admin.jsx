import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand.jsx";
import CreateType from "../components/modals/CreateType.jsx";
import CreateDevice from "../components/modals/CreateDevice.jsx";
import * as tty from "node:tty";

const Admin = () => {

    const [brandVisible, setBrandVisible] = useState(false);
    const [typedVisible, setTypedVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
       <Container className='d-flex flex-column'>
           <Button
               onClick={()=>setTypedVisible(true)}
               variant={"outline-dark"}
               className="mt-2 p-2"
           >
               Добавить тип
           </Button>

           <Button
               onClick={()=>setBrandVisible(true)}
               variant={"outline-dark"}
               className="mt-2 p-2"
           >
               Добавить бренд
           </Button>

           <Button
               onClick={()=> setDeviceVisible(true)}
               variant={"outline-dark"}
               className="mt-2 p-2"
           >
               Добавить устройство
           </Button>

           <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)}/>
           <CreateDevice show={deviceVisible} onHide={()=>setDeviceVisible(false)}/>
           <CreateType show={typedVisible} onHide={()=>setTypedVisible(false)}/>

       </Container>
    );
};

export default Admin;