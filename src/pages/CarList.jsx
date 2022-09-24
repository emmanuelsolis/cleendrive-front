import React, { useState, useEffect } from "react";
import { Col, Button, Row, Divider, Typography } from "antd";
import { CarProfile} from "../components";
import { carListWs, carDeleteWs } from "../services/car-ws";

export default function CarList(props) {
  const [carList, setCarList] = useState([]);
  const [car, setCar] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [beingCreated, setBeingCreated] = useState(false);


  useEffect(() => {
    carListWs()
      .then((res) => {
        setCarList(res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [beingCreated]);

  return (
    <div>
        <Typography.Title level={1}>Detalles del Vehiculo</Typography.Title>
        <Divider orientation="center"/>
        <div>
            <CarProfile car={car} />
        </div>
    </div>
   
  );
}