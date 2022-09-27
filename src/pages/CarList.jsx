import React, { useState, useEffect } from "react";
import { Col, Button, Row, Divider, Typography } from "antd";
import { CarProfile } from "../components";
import { carListWs } from "../services/car-ws";
import { RegisterCarPage } from "../pages";

export default function CarList(props) {
  const [carList, setCarList] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
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
      <div>
        <Typography.Title level={1}>Mis Coches</Typography.Title>
        <Divider orientation="center" />
        {props.user.role === "Client" && (
          <Button type="primary" onClick={() => setIsCreated(!isCreated)}>
            Registra un nuevo vehiculo
          </Button>
        )}
        {isCreated && <RegisterCarPage beingCreated={beingCreated} setBeingCreated={setBeingCreated} />}
      </div>
      <div className="cards">
        <Row gutter={[40, 16]}>
          {carList.map( car => (
            <Col span={8}>
              <CarProfile car={car} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
