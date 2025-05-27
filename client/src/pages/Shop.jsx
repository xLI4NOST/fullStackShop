import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import TypeBar from "../components/TypeBar.jsx";
import BrandBar from "../components/BrandBar.jsx";
import DeviceList from "../components/DeviceList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {fetchBrands, fetchDevice, fetchTypes} from "../api/deviceAPI.js";


const Shop = observer(() => {

    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))

        fetchBrands()
            .then(data => device.setBrands(data))

        fetchDevice()
            .then(data => device.setDevices(data.rows))
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;