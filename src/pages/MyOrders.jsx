import React, { useState, useEffect } from 'react'
import { myOrdersWs, employeeOrdersWs } from '../services/order-ws'
import { Space, Table, List }  from 'antd'

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

const TableOrders = (props) => {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState();

    useEffect(() => {
        if(props.user.role === 'Employee'){
            employeeOrdersWs()
                .then( res => {
                    setOrders(res.data.orders)
                })
                .catch( err => {
                    console.log(err)
                })
        } else {
            myOrdersWs()
                .then( res => {
                    setOrders(res.data.orders)
                })
                .catch( err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div>
            <Table columns={colums} dataSource={orders} />
        </div>
    )
}

export default TableOrders