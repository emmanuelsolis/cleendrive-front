import React, { useState, useEffect } from 'react'
import { OrderCard } from '../components'
import { orderDetailWs, orderEditWs, deleteOrderWs } from '../services/order-ws'
import { Space, Table, List, Row}  from 'antd'


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
        dataIndex: 'eventDate',
        key: 'eventDate',
    },
    {
        title: 'Solicitante',
        dataIndex: '_owner',
        key: '_owner',
    },
    {
        title: 'Nombre del Cliente',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Teléfono del Cliente',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
    },
    {
        title: 'Dirección del Cliente',
        dataIndex: 'customerAddress',
        key: 'customerAddress',
    },
    {
        title: 'Precio',
        dataIndex: 'servicePrice',
        key: 'servicePrice',
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
        dataIndex: 'status',
        key: 'status',
    }

]

const OrderDetails = (props) => {
    
        const [order, setOrder] = useState([])
        const [orderDetail, setOrderDetail] = useState([])
        const [orderEdit, setOrderEdit] = useState([])
        const [deleteOrder, setDeleteOrder] = useState([])
    
        useEffect(() => {
            orderDetailWs(props.match.params.id)
                .then((res) => {
                    setOrder(res.data)
                    setOrderDetail(res.data.orderDetail)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, [])
    
        const handleEdit = (e) => {
            e.preventDefault()
            orderEditWs(props.match.params.id, order)
                .then((res) => {
                    setOrder(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    
        const handleDelete = (e) => {
            e.preventDefault()
            deleteOrderWs(props.match.params.id)
                .then((res) => {
                    setDeleteOrder(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    
        return (
            <div>
                <Row>
                    <h1>Detalles de la Orden</h1>
                </Row>
                <Row>
                    <Table dataSource={orderDetail} columns={colums} />
                </Row>
                <Row>
                    <Space>
                        <button onClick={handleEdit}>Editar</button>
                        <button onClick={handleDelete}>Eliminar</button>
                    </Space>
                </Row>
                <Row>
                    <OrderCard order={order} />
                </Row>
                <Row>

                </Row>
            </div>
        )
}
export default OrderDetails;