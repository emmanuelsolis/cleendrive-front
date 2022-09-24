import React, { useState, useEffect } from "react";
import { Col, Button, Row, Divider, Typography } from "antd";
import { CarProfile, RegisterCarPage} from "../components";
import { carListWs, carDetailWs, carDeleteWs } from "../services/car-ws";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { api, uploadURL } from "../services/api";

// const { Content, Header, Footer } = Layout;
// const { data } = api;

export default function CarList(props) {
  const [carList, setCarList] = useState([]);
  const [car, setCar] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [beingCreated, setBeingCreated] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

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