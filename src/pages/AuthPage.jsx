import React, { useState } from "react";
import { Form, Modal, Radio } from "antd";
import { FormItem } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
//me traigo mis servicios !! LoginWS SignupWS
import { loginWs, signupWs } from "../services/auth-ws";
const AuthPage = (props) => {
  const [role, setRole] = useState("Client");
  //utilizo el Hook useLocation
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (e) => {
    setRole(role === "Client" ? "Employee" : "Client");
    console.log(e.target.role, e.target.value);
  };
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
        Modal.success({ content: "Se registró con éxito como {props.user.role}" });
        navigate("/profile");
      } else {
        //pueden guardar el errorMessa en un state para mostrarlo en el html
        Modal.error({ content: errorMessage });
      }
    });

    console.log("Success:", values);
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
              <Radio.Group defaultValue="a" buttonStyle="solid center">
                <Radio.Button value="{role:'Cliente'}">Registrarme Como Usuario</Radio.Button>
                <Radio.Button value="{role:'Employee'}">Resgistrame como Empleado</Radio.Button>
              </Radio.Group>
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
