import React, { useState, useEffect } from 'react'
import {Row, Col, Button, Divider, Typography, Carousel } from "antd";
import { ServiceForm, ServiceCard,   } from '../components';
import { serviceListWs } from '../services/cleanServices-ws';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const ListServices = (props) => {
    const [serviceCards, setserviceCards] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [beingCreated, setBeingCreated] = useState(false);
  

    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    useEffect(() => {
        serviceListWs()
            .then( res => {

                setserviceCards(res.data.services)
            })
            .catch( err => {
                console.log(err)
            });
    }, [beingCreated])
    return(
        <div>
            <div>
                <Typography.Title level={1}>Mis Servicios</Typography.Title>
                <Divider orientation="center" />
                {props.user.role === "Admin" && <Button type='primary' onClick={()=> setIsCreate(!isCreate)}>
                    Crear un nuevo servicio
                </Button>}
                {isCreate && <ServiceForm
                    beingCreated={beingCreated}
                    setBeingCreated={setBeingCreated}
                />}
            </div>
            <div className="cards">
                <Row gutter={[40, 16]}>
                    {serviceCards.map( service => {
                        return(
                            <Carousel afterChange={onChange}>
                                <Col span={40}>
                                    <ServiceCard 
                                    img={service.photoServiceUrl}
                                    name={service.typeService}
                                    price={service.price}
                                    description={service.description}
                                    deliverTime={service.deliverTime}
                                        
                                    />
                                    
                                </Col>
                            </Carousel>
                        )
                    })}    
                </Row>
            </div>

        </div>
    )

  
}

export default ListServices
