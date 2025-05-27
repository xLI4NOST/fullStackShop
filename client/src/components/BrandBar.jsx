import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {

    const {device}=useContext(Context)

    return (
       <div
           style={{
               display: "flex",
               gap: '15px'
            }}>
           {device.brands.map((brand) => (
               <Card
                   style={{cursor: "pointer"}}
                   key={brand.id}
                   onClick={()=>device.setSelectedBrand(brand)}
                   border={brand.id === device.selectedBrand.id ? "danger" : "light"}
               >
                   {brand.name}
               </Card>
           ))}
       </div>
    );
})

export default BrandBar;