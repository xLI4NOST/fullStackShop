import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem.jsx";

const DeviceList = observer (() => {
    const {device} = useContext(Context)
    return (
        <Row className='d-flex' >
            {device.devices.map(device => (
            <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    );
});

export default DeviceList;