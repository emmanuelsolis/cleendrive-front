import { useState } from "react";
import {
  Input,
  Space,
  Layout,
  Avatar,
  Descriptions,
  Form,
  Button,
  Upload,
  message,
  Modal
} from "antd";
import { FormItem } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { carRegisterWs, carEditWs } from "../services/car-ws";
import { uploadURL } from "../services/api";
const { Content} = Layout;
const { TextArea } = Input;

export default function CarRegisterPage({beingCreated, setBeingCreated}) {
  const [isEdit, setIsEdit] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const configUpload = {
    name: "image",
    // action: 'http://localhost:5005/api/upload/single',
    action: uploadURL,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(
          "What is imageUrl",
          beingCreated.imageURL,
          beingCreated.car.imageURL
        );
      }

      if (info.file.status === "done") {
        setImageURL(info.file.response.url.uri);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  const onFinish = (values) => {
    const { id } = values;
    if(values.id){
      carEditWs({id, ...values, carPhoto: imageURL})

      .then((res) => {
        if(res.status){
          Modal.success({
            content: "Coche editado exitosamente",
          })
        }
        console.log("ELCARPHOTO, ", res.data.carPhoto);
        navigate("/main/vehiculos");
      })
      .catch((err) => {
        console.log("el error", err);
      });
    }else {
      carRegisterWs({...values, imageUrl: imageURL})
      .then((res) => {
        if(res.status){
          Modal.success({
            content: "Coche registrado exitosamente",
          })
        }
        navigate("/main/vehiculos");
      })
      .catch((err) => {
        console.log("el error", err);
      });
    }
    // const service =
    //   (values.id)
    //     ? carRegisterWs(values)
    //     : carEditWs(values, values.id);
    // service.then((res) => {
    //   const { data, status, errorMessage } = res;
    //   if (status) {
    //     props.authentication(data.user);
    //     Modal.success({ content: "Vehículo Registrado con éxito!" });
    //     navigate("/main/vehiculos");
    //   } else {
    //     //pueden guardar el errorMessa en un state para mostrarlo en el html
    //     Modal.error({ content: errorMessage });
    //   }
    // });
    // console.log("Success:", values);
    // carEditWs({ ...values, imageUrl }).then((res) => {
    //   const { status, data, errorMessage } = res;
    //   if (status) {
    //     props.authentication(data.user);
    //   } else {
    //     console.log("Error actualizar", errorMessage);
    //   }
    // });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Content>
      {/* Avatar o un tag img para mostrar la imagen del usuario */}
      {/* <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={setBeingCreated.car.imageUrl}
      /> */}

      {/* <Button onClick={() => setIsEdit((prevState) => !prevState)}>
        Editar Datos del Auto
      </Button> */}
      {/* Puede ser una card para mostrar informacion del usuario */}
      {/* {isEdit ? "se puede editar" : "no se puede"} */}
      {/* {isEdit ? "poner los inputs" : "descripcion"} */}
      {/* Modal */}
      {/* <Descriptions title="User Info">
        <>
          <Descriptions.Item label="Nombre">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
          <Descriptions.Item label="email">
            {props.user.email}
          </Descriptions.Item>
          <Descriptions.Item label="rol">{props.user.role}</Descriptions.Item>
        </>
      </Descriptions> */}
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem label="Nombre" name="carName" />
        <FormItem label="Modelo" name="carModel" />
        <FormItem label="Marca" name="carBrand" />
        <FormItem label="Año" name="carYear" />
        <FormItem label="Placa" name="carPlate" />
        <FormItem label="Color" name="carColor" />
        <Upload {...configUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        {location.pathname === "/register-car" ? (
          <FormItem
            button_text="Enviar"
            type="button"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          />
        ) : (
          <FormItem
            button_text="editar"
            type="button"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          />
        )}
      </Form>
    </Content>
  );
}
