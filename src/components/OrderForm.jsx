import React, { useState, useEffect } from 'react'
import { placeOrderWs } from "../services/order-ws";
import { serviceListWs } from '../services/cleanServices-ws';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  TimePicker,
  Checkbox,
  Radio,
  Modal,
  Row,
  Space
} from "antd";
import { FormItem } from "../components";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!"
    }
  ]
};

const OrderForm = ({ beingCreated, setBeingCreated }) => {
    const [serviceList, setServiceList] = useState([]);
    const [choosedService, setChoosedService] = useState([]);


    useEffect(() => {
        serviceListWs()
        .then(res => {
            setServiceList(res.data.services);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

  const onServiceTypeChange = (fieldsValue) => {
    // eslint-disable-next-line default-case
    switch (fieldsValue) {
      case "Lavado en domicilio":
        Form.setFieldsValue({
          value: "Lavado en domicilio"
        });
        return;

      case "Recoger para lavado":
        Form.setFieldsValue({
          value: "Recoger para lavado"
        });
        return;

      case "Lavado de Interiores":
        Form.setFieldsValue({
          value: "Lavado de Interiores"
        });
        return;

      case "Pulido y encerado":
        Form.setFieldsValue({
          value: "Pulido y encerado"
        });
    }
  };

  const onChange = (checkedValues) => {
        setChoosedService(checkedValues);
  }

  const onFinish = ({values,fieldsValue}) => {
    const value = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
      "time-picker": fieldsValue["time-picker"].format("HH:mm:ss")
    };
    console.log("Received values of form: ", values);
    placeOrderWs({values: value, _services: choosedService})
      .then((res) => {
        if (res.status) {
          Modal.success({
            content: "Orden creada exitosamente"
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (values) => {
    Modal.error({
      content: "Error al crear la orden"
    });
  };

  return (
    <div>
      <div className="forms">
        <Space
          direction="vertical"
          align="mock-block"
          style={{
            display: "flex"
          }}
        >
          <br />
          <br />
          <Form
            name="time_related_controls"
            {...formItemLayout}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <FormItem
              label="Numero de Orden"
              name="orderNumber"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </FormItem>
            <Form.Item>
              <Checkbox.Group
                style={{
                  width: "100%"
                }}
              >
                <Row>
                  <Checkbox.Group
                    onChange={onChange}
                    options={serviceList.map((item) => ({
                      value: item._id,
                      label: item.serviceName
                    }))}
                  />
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="typeService"
              label="Tipo de Servicio"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Selecciona el tipo de servicio"
                onChange={onServiceTypeChange}
                allowClear
              >
                <Option value="Lavado en domicilio">Lavado en domicilio</Option>
                <Option value="Recoger para lavado">Recoger para lavado</Option>
                <Option value="Lavado de Interiores">
                  Lavado de Interiores
                </Option>
                <Option value="Pulido y encerado">Pulido y encerado</Option>
              </Select>
            </Form.Item>
            <FormItem
              label="Nombre del Cliente"
              name="customerName"
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Numero Telefonico"
              name="customerPhone"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </FormItem>
            <FormItem
              label="Direccion"
              name="shippingAddress"
              rules={[{ required: true }]}
            >
              <FormItem
                label="Calle:"
                name="shippingAddress.street"
                rules={[{ required: true }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="Numero"
                name="shippingAddress.houseNumber"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </FormItem>
              <FormItem
                label="Ciudad"
                name="shippingAddress.city"
                rules={[{ required: true }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="Codigo Postal"
                name="shippingAddress.zipCode"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </FormItem>
            </FormItem>
            <Form.Item name="servicePrice" label="Precio">
              <Radio.Group>
                <Radio value="120"> Lavado en domicilio </Radio>
                <Radio value="150"> Recoger para lavado</Radio>
                <Radio value="400"> Lavado de Interiores </Radio>
                <Radio value="700">Pulido y encerado</Radio>
              </Radio.Group>
            </Form.Item>
            <FormItem
              label="Subtotal"
              name="subtotal"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </FormItem>
            <FormItem
              label="Metodo de Pago"
              name="paymentMethod"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="Efectivo"> Efectivo</Radio>
                <Radio value="Tarjeta de crédito"> Tarjeta de crédito </Radio>
                <Radio value="Tarjeta de débito"> Tarjeta de débito</Radio>
                <Radio value="paypal"> Paypal </Radio>
              </Radio.Group>
            </FormItem>
            <Form.Item name="date-picker" label="DatePicker" {...config}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="time-picker" label="TimePicker" {...config}>
              <TimePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0
                },
                sm: {
                  span: 16,
                  offset: 8
                }
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default OrderForm;
