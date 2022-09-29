import React, { useState } from "react";
import { Form, Modal, Radio, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { FormItem } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
//me traigo mis servicios !! LoginWS SignupWS
import { loginWs, signupWs } from "../services/auth-ws";
import { editUserWs } from "../services/user-ws";
import { uploadURL } from '../services/api';
const AuthPage = (props) => {
  // const [role, setRole] = useState("Client");
  const [imageUrl, setImageUrl] = useState('');
  //utilizo el Hook useLocation
  const location = useLocation();
  const navigate = useNavigate();

  
  const onChange = () => {
    const {...user} = props
    
      editUserWs(user)
      .then(res=>{
        const {user} = res
        if(user.role) {
          user.role = "Employee"
          console.log("EL ROL" , user.role);
        }else {
          user.role = "Client"
        } 

      })
      .catch(err=>{
        console.log(err)
      })
    
  }
  const configUpload = {
    name: 'image',
    action: uploadURL,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url.uri)
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
  }
 
  const onFinish = (values) => {
    if (
      location.pathname === "/signup" &&
      values.password !== values.confirmPassword
    ) {
      return Modal.error({ content: "Las contraseñas no coinciden" });
    }
    //forma dinamica
    const service =
      location.pathname === "/signup" ? signupWs(values) : loginWs(values);

    service.then((res) => {
      const { data, status, errorMessage } = res;
      if (status) {
        props.authentication(data.user);
        Modal.success({ content: "Se registró con éxito" });
        navigate("/main/mi-perfil");
      } else {
        //pueden guardar el errorMessa en un state para mostrarlo en el html
        Modal.error({ content: errorMessage });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {location.pathname === "/signup" && (
        <div>
         
          <FormItem
            button_text="Quiero trabajar con ustedes"
            type="button"
            onClick={onChange}
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          />
        </div>
      )}
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* con mas de dos elementos */}
          {location.pathname === "/signup" ? (
            <>
              <FormItem label="Nombre" name="firstName" type="text" />
              <FormItem label="Apellido" name="lastName" type="text" />
              <FormItem label="Edad" name="age" type="number" />
              <FormItem label="Calle" name="address.street" type="text" />
              <FormItem label="Número" name="address.number" type="number" />
              <FormItem label="Ciudad" name="address.city" type="text" />
              <FormItem
                label="Código Postal"
                name="address.zipCode"
                type="number"
              />
            </>
          ) : null}
          <FormItem
            label="Correo"
            name="email"
            type="text"
            rules={[
              {
                required: true,
                message: "Coloca tu correo!"
              }
            ]}
          />
          <FormItem
            label="Contraseña"
            name="password"
            type="password"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu contraseña!"
              }
            ]}
          />
          {/* && */}
          {location.pathname === "/signup" && (
            <FormItem
              label="Confirma tu contraseña"
              name="confirmPassword"
              type="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu contraseña nuevamente!"
                }
              ]}
            />
          )}

          <FormItem
            button_text="Enviar"
            type="button"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          />

          {location.pathname === "/signup" ? (
            <p>
              Si ya tienes cuenta <Link to="/login">ingresa!</Link>
            </p>
          ) : (
            <p>
              Si aun no tienes cuenta <Link to="/signup">registrate!</Link>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
