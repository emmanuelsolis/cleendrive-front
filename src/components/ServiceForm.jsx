import React, { useState } from 'react'
import { createServiceWs } from '../services/cleanServices-ws'
import { PlusOutlined } from '@ant-design/icons';
import { FormItem } from '../components';
import { Form, Input, Button, Upload, Modal, Space,Select,Radio } from 'antd';
import { uploadURL } from '../services/api';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input
const { Option } = Select;



const ServiceForm = ({beingCreated, setBeingCreated}) => {
    const [imageURL, setImageURL] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const configUpload = {
        name: 'image',
        action: uploadURL,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                console.log("que es info", info);
                setImageURL(info.file.response.url.uri)
                Modal.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                Modal.error(`${info.file.name} file upload failed.`);
            }
        }
    }

    const onServiceTypeChange = (value) => {
        // eslint-disable-next-line default-case
        switch (value) {
          case 'Lavado en domicilio':
            form.setFieldsValue({
              value: 'Lavado en domicilio',
            });
            return;
    
          case 'Recoger para lavado':
            form.setFieldsValue({
              value:'Recoger para lavado',
            });
            return;
            
        case 'Lavado de Interiores':
            form.setFieldsValue({
              value:'Lavado de Interiores',
            });
            return;
    
          case 'Pulido y encerado':
            form.setFieldsValue({
              value: 'Pulido y encerado',
            });
        }
      };
      
      


     
    const onFinish = (values) => {
        console.log("YO SOY VALUES",values);

        createServiceWs({ ...values, photoServiceUrl: imageURL})
            .then(res => {
        console.log("YO Soyt Ress",res);

                if(res.data){
                    setBeingCreated(!beingCreated)
                }
                if(res.status){
                    Modal.success({
                        content: 'Servicio creado con éxito',
                    })
                }
                navigate("/main/servicios");
            })
    }

    const onFinishFailed = (values) => {
        console.log("Failed:", values);
    }

      return (
        <div>
          <div className="form">
            <Space 
                direction="vertical"
                align='center'
                style={{
                    display: 'flex',
                }}
            >
            <br /><br />
            <Form
            layout= 'horizontal'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item name="typeService" label="Tipo de Servicio" rules={[{required: true}]}>
                    <Select
                        placeholder="Selecciona el tipo de servicio"
                        onChange={onServiceTypeChange}
                        allowClear
                        >
                        <Option value="Lavado en domicilio">Lavado en domicilio</Option>
                        <Option value="Recoger para lavado">Recoger para lavado</Option>
                        <Option value="Lavado de Interiores">Lavado de Interiores</Option>
                        <Option value="Pulido y encerado">Pulido y encerado</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="price" label="Precio">
                    <Radio.Group>
                        <Radio value="120"> $120.00 </Radio>
                        <Radio value="150"> $150.00 </Radio>
                        <Radio value="400"> $400.00 </Radio>
                        <Radio value="700"> $700.00 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="description" label="Descripción" rules={[{required: true}]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="deliverTime" label="Tiempo de entrega">
                    <Radio.Group>
                        <Radio value="1.5"> 1.5hrs </Radio>
                        <Radio value="2"> 2hrs </Radio>
                        <Radio value="4"> 4hrs </Radio>
                        <Radio value="2.5"> 2.5hrs </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item valuePropName='fileList'>
                    <Upload {...configUpload} listType="picture-card">
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Subir Imagen</div>
                    </div>
                    </Upload>
                </Form.Item>
                <div>
                {isEdited ? (
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
                    <Button type="primary" htmlType='submit'>
                        Crear Servicio
                    </Button>
                </div>
            </Form>
            </Space>
          </div>
        </div>
      )
}
    
  
    
export default ServiceForm;
