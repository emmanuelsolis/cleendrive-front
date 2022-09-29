import React, { useState, useEffect } from 'react'
import { FormItem } from "../components";
import { Link } from 'react-router-dom';
import { Card, Button, Image } from "antd";
import { EditCar } from "../components";
import { carDeleteWs, carDetailWs } from "../services/car-ws";
import "../App.css";

const { Meta } = Card;

const CarProfile = (props) => {
    const { handleLogout, Data } = props;
  const [carData, setCarData] = useState([]);
  const [status, setStatus] = useState(Data);
  const [isEdited, setIsEdited] = useState();
  useEffect(() => {
    carDetailWs(props.car.carPlate, props.car._id)
        .then((res) => {
            setCarData(res.data)
        })
        .catch((err) => {
            console.log("el error",err)
        })
},[setCarData])
  return (
    <div className="cards">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img src={props.car.carPhoto} alt={props.car.alt} />}
      >
        <Meta title={props.title} description={props.description} />
        <Image src={props.car.carPhoto} alt={props.car.alt} />
        {props.car.imageUrl}
        <h1>{props.car.carName}</h1>
        <h2>Version: {props.car.carModel}</h2>
        <h2>Marca: {props.car.carBrand}</h2>
        <h2>Modelo: {props.car.carYear}</h2>
        <h2>Placa: {props.car.carPlate}</h2>
        <h2>Color: {props.car.carColor}</h2>
        <Button>
          <Link to={"/car/edit-car"}>Editar</Link>
        </Button>
        <br />
        <br /> <hr /> <br />
        <FormItem
          button_text="Eliminar Perfil"
          type="button"
          onClick={() =>
            setStatus(
                carDeleteWs(Data)
                .then(() => {
                  handleLogout((prevState) => !prevState);
                })
                .cath((error) => {
                  console.log(error);
                })
            )
          }
          wrapperCol={{
            offset: 8,
            span: 16
          }}
          className="btn-component"
        />
      </Card>
      {isEdited && <EditCar setIsEdited={setIsEdited} />}
    </div>
  );
};

export default CarProfile;
