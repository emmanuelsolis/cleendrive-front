import React, { useState } from 'react'
import { carEditWs } from '../services/car-ws'
import { Form, Input, Button, Space, Modal, Upload, InputNumber } from 'antd'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { uploadURL } from '../services/api'
const { TextArea } = Input


const EditCar = ({beingCreated, setBeingCreated}) => {
    const [imageURL, setImageURL] = useState("");

    const configUpload ={
        name : 'image',
        action: uploadURL,
        onChange(info){
            if(info.file.status !== 'uploading'){
                console.log(info.file, info.fileList)
            }
            if(info.file.status === 'done'){
                console.log(`${info.file.name} Imagen cargada exitosamente`)
                setImageURL(info.file.response.url.uri)
            }else if(info.file.status === 'error'){
                console.log(`${info.file.name} fallo al cargar la imagen`)
            }
        }
    }
    const onFinish = (values) => {
      carEditWs({ ...values, imageUrl: imageURL})
        .then((res) => {
            if(res.data){
                setBeingCreated(!beingCreated)
            }
            if(res.status){
                Modal.success({
                    content: 'Coche editado exitosamente'
                })
            }
        })
    }
    const onFinishFailed = (values) =>{
        console.log("Failed: ", values);
    }
    
    return (
    <div>
      <div className="forms">
        <Space
            direction="vertical"
            align='mock-block'
            style={{
                display: 'flex',
            }}
        >
            <Form
                layout='horizontal'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="carName" rules={[{required: true, message: 'Por favor ingresa el nombre del coche'}]}>
                    <Input placeholder="Nombre del coche" />
                </Form.Item>
                <Form.Item name="carModel" rules={[{required: true, message: 'Por favor ingresa el modelo del coche'}]}>
                    <Input placeholder="Version del coche" />
                </Form.Item>
                <Form.Item name="carYear" rules={[{required: true, message: 'Por favor ingresa el año del coche'}]}>
                    <InputNumber placeholder="Modelo del coche" />
                </Form.Item>
                <Form.Item name="carColor" rules={[{required: true, message: 'Por favor ingresa el color del coche'}]}>
                    <Input placeholder="Color del coche" />
                </Form.Item>
                <Form.Item name="carPlate" rules={[{required: true, message: 'Por favor ingresa la placa del coche'}]}>
                    <Input placeholder="Placa del coche" />
                </Form.Item>
                <Form.Item valuePropName='fileList' name="imageUrl" rules={[{required: true, message: 'Por favor ingresa la imagen del coche'}]}>
                    <Upload {...configUpload} listType="picture-card">
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Subir Imagen</div>
                    </div>
                    </Upload>
                </Form.Item>
                <div>
                    <Button type="primary" htmlType="submit">
                        Editar Coche
                    </Button>
                </div>
            </Form>
        </Space>
                        
      </div>
    </div>
  )
}

export default EditCar
