import React, { useState, useEffect } from "react";
import { Layout, Typography, Button } from "antd";
import { CardDetails, LayoutPage, Navbar, CarProfile } from "../components";
import { carListWs, carDetailWs, carDeleteWs } from "../services/car-ws";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api, uploadURL } from "../services/api";

const { Content, Header, Footer } = Layout;
const { data } = api;

export default function CarsDetails(props) {
  const [listCars, setListCars] = useState([]);
  const [car, setCar] = useState(null);
  const [isNew, setIsNew] = useState(null);
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
    <LayoutPage>
      <Header>
        <Navbar {...props} />
      </Header>
      <Content>
        <div className="site-layout-content">
          <Typography.Title level={1}>Vehículos</Typography.Title>
        </div>
        <div className="site-layout-content">
          <CardDetails>
            <CarProfile {...props} />
            <Button type="primary" htmlType="submit">
              Editar
            </Button>
            <Button type="primary" htmlType="submit">
              Eliminar
            </Button>
          </CardDetails>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Typography.Title level={5}>
          ©2021 Emmanuel Solis Todos los derechos reservados
        </Typography.Title>
      </Footer>
    </LayoutPage>
  );
}
