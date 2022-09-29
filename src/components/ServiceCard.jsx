import React, { useState, useEffect } from 'react'
import { Card} from 'antd';
import { FormItem, ServiceForm } from '../components'
import { api } from '../services/api'
import { serviceDetailWs,serviceDeleteWs, serviceEditWs } from '../services/cleanServices-ws';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'


const Data = api


const { Meta } = Card;

const ServiceCard = (props) => {
    const [user, setUser] = useState(null);
    const [serviceData, setServiceData] = useState([]);
    const [status, setStatus] = useState(Data);
    const [isEdited, setIsEdited] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = props
    console.log("LOS PROPS", props);

    const onFinished = (values) => {
        console.log("VALUES", values);
        serviceEditWs(id, values)
            .then((res) => {
                console.log("RES", res);
                setIsEdited(!isEdited);
                navigate("/list-services");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onFinishFailed = (values) => {
        console.log("VALUES onFinishFailed", values);
    };
    useEffect(() =>{
        serviceDetailWs(id)
        .then(res => {
            setServiceData(res.data.services)
            navigate()
        })
        .catch(err => {
            console.log(err)
        })
    }, [serviceData])

    
    const handleDelete = (id) => {
        serviceDeleteWs(id)
        .then(res => {
            console.log(res)
            setStatus(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleEdit = (id) => {
        serviceEditWs(id)
        .then(res => {
            console.log(res)
            setStatus(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="cards">

            <Card
                hoverable
                style={{ width: 440 }}
                cover={<img alt="example" src={props.img} />}
            >
                <Meta title={props.name} description={props.description} /><br />
                <span><b>Precio del Servicio:</b> ${props.price}.00</span><br />
                <span><b>Tiempo de entrega:  </b>{props.deliverTime}hrs</span>
                <br /><br />
                {/* {props.user.role === 'Admin' && */}
                {/* {!(<Carousel></Carousel>) && */}
                <div className="btns">
                    <FormItem
                        button_text="editar"
                        onClick={() => 
                        setIsEdited(!isEdited)
                        .then(res => {
                            navigate("../components/ServiceForm")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        }
                        type="button"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    />
                    {/* } */}
                    {isEdited && 
                    <ServiceForm 
                        beingEdited={isEdited}
                        setBeingEdited={setIsEdited}
                    />}
                    <br />
                    {/* {props.user.role === 'Admin' && */}
                    <FormItem

                        button_text="Eliminar Servicio"
                        type="button"
                        onClick={() => setStatus(Data)
                        .then(() => {
                            handleDelete(prevState => !prevState)
                        })
                        .cath((error)=>{
                            console.log(error)
                        })
                        }
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    />
                    {/* } */}
                </div>
                {/* } */}
            </Card>
        </div>
    )
}

export default ServiceCard