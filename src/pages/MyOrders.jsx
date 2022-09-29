import React, { useState, useEffect } from 'react'
import { OrderCard } from '../components'
import { myOrdersWs, employeeOrdersWs } from '../services/order-ws'
import { Space, Table, List, Row, Col, Divider, Typography }  from 'antd'
import { api } from '../services/api'



const colums = [
    {
        title: 'Número de Orden',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    },
    {
        title: 'Servicio',
        dataIndex: 'typeService',
        key: 'typeService',
    },
    {
        title: 'Fecha',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
  
    {
        title: 'Nombre del Cliente',
        dataIndex: '_owner.firstName',
        key: '_owner.firstName',
    },
    {
        title: 'Teléfono del Cliente',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
    },
    {
        title: 'Dirección del Cliente',
        dataIndex: 'address',
        key: 'address',
    },
       {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        key: 'subtotal',
    },
    {
        title: 'Métdo de Pago',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
    },
    {
        title: 'Estado',
        dataIndex: 'serviceStatus',
        key: 'serviceStatus',
    }

]

const TableOrders = (props) => {
    const {data,  user } = api
    const [userProfile, setUserProfile] = useState(data)
    const [orders, setOrders] = useState([])
    const [isCreated, setIsCreated] = useState(false);
    const [beingCreated, setBeingCreated] = useState();
    const [status, setStatus] = useState('Pending');

    // const { role } = props.userProfile
    useEffect((props) => {
        if( 'Client'){
            myOrdersWs()
                .then( res => {
                    setOrders(res.data.orders)
                })
                .catch( err => {
                    console.log(err)
                })
        } else {
            
            employeeOrdersWs()
            .then((res) => {

                    setOrders(res.data.orders)
                })
                .catch( err => {
                    console.log(err)
                })
        }
    }, [setOrders])

    return (
        <div className='cards'>
            <Typography.Title level={1}>Mis Ordenes</Typography.Title>
            <Divider orientation="center" />
            <Table columns={colums} dataSource={orders} />
            <Row gutter={[40, 16]}>
            {orders.map(order => (
                <OrderCard
                    order={order}
                    number={order.orderNumber}
                    name={order.typeService}
                    date={order.updatedAt}
                    client={order.user}
                    phone={order.customerPhone}
                    address={order.customerAddress}
                    subtotal={order.subtotal}
                    payment={order.paymentMethod}
                    description={order.description}
                    status={order.serviceStatus}
                />
            ))}

            </Row>
        </div>
    )
}

export default TableOrders