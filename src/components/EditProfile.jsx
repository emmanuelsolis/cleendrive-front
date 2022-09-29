import { useState } from 'react'
// import  Data  from '../services/api'
import { Layout, Avatar, Descriptions, Form, Button, Upload, message } from 'antd'
import { FormItem } from '../components'
import { UploadOutlined } from '@ant-design/icons';
import { editUserWs } from '../services/user-ws';
import { useNavigate } from 'react-router-dom';
import { api, uploadURL } from '../services/api';

const { Content } = Layout
const { Data } = api

export default function ProfilePage(props) {
    const {  handleLogout} = props
    const [isEdit, setIsEdit] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [status, setStatus] = useState(Data);

    const navigate = useNavigate()
    
    const configUpload = {
        name: 'image',
        action: uploadURL,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                console.log("que es info", info);
                setImageUrl(info.file.response.url.uri)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
  
    
    const onFinish = (values) => {
        // console.log("Success:", values);    
        editUserWs({ ...values, imageUrl })
            .then(res => {
                const { status, data, errorMessage } = res;

                if (status) {
                    props.authentication(data.user);
                    navigate("/main/mi-perfil");
                } else {
                    console.log("Error actualizar", errorMessage)
                }
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Content>
            {/* Avatar o un tag img para mostrar la imagen del usuario */}
            <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={props.user.imageUrl}
            />
            <Button onClick={() => setIsEdit((prevState) => !prevState)}>
                Editar perfil
            </Button>
            {/* Puede ser una card para mostrar informacion del usuario */}
            {isEdit ? "se puede editar" : "no se puede"}
            {/* {isEdit ? "poner los inputs" : "descripcion"} */}
            {/* Modal */}
            <Descriptions title="User Info">
                <>
                    <Descriptions.Item label="Nombre">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
                    <Descriptions.Item label="email">{props.user.email}</Descriptions.Item>
                    <Descriptions.Item label="rol">{props.user.role}</Descriptions.Item>
                </>
            </Descriptions>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <FormItem
                    label="Nombre"
                    name="firstName"
                />
                <FormItem
                    label="Apellido"
                    name="lastName"
                />
                <FormItem
                    label="Correo"
                    name="email"
                    disabled
                    value={props.user.email}
                />

                <FormItem label="role" name="role" disabled value={props.user.role} />

                <Upload {...configUpload}>
                    <label htmlFor="imageUrl">Elige tu imagen de Perfil</label><br />
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>

                <FormItem
                    button_text="editar"
                    type="button"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                />
                {/* <FormItem
                    button_text="Eliminar Perfil"
                    type="button"
                    onClick={() => setStatus(deleteProfileWs(Data)
                    .then(() => {
                        handleLogout(prevState => !prevState)
                    })
                    .cath((error)=>{
                        console.log(error)
                    }))
                    }
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                /> */}
            </Form>
        </Content>
    )
}
               
