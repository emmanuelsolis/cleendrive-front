import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Image } from "antd";
import { CardDetails, LayoutPage, Navbar, CarProfile } from "../components";
import { carListWs, carDetailWs, carDeleteWs } from "../services/car-ws";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api, uploadURL } from "../services/api";

const { Content, Header, Footer } = Layout;
const { data } = api;

export default function CarsDetails(props) {
  const [listCars, setListCars] = useState([]);
  const [car, setCar] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [beingCreated, setBeingCreated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    carListWs()
      .then((res) => {
        setListCars(res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [beingCreated]);

  return (
    <div>
        <Typography.Title level={1}>Detalles del Vehiculo</Typography.Title>
        <div>
            <CarProfile car={car} />
        </div>
    </div>
   
  );
}
