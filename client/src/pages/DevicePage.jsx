import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Card, Button} from "react-bootstrap";
import bigStar from "../Assets/star.png"
import {useParams} from "react-router-dom";
import {fetchDevice, fetchSingleDevice} from "../api/deviceAPI.js";

const DevicePage = () => {

    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()


    useEffect(()=>{
        fetchSingleDevice(id)
            .then(data => setDevice(data))
    }, [])


    return (
        <Container className="mt-3">

            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img && import.meta.env.VITE_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2> {device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>
                            От: {device.price} рублей
                        </h3>

                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info.map((info,index) => (
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                ))}
            </Row>

        </Container>
    );
};

export default DevicePage;