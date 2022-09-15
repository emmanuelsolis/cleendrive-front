import { api } from './api'
import {succcesStatus, internalServerError} from '../utils/format-response'

export const preOrderWs = (data) =>
api.patch("/order/pending/:id", data)
.then(succcesStatus)
.catch(internalServerError)
export const placeOrderWs = (data) =>
api.post("/order/place", data)
.then(succcesStatus)
.catch(internalServerError)
export const myOrdersWs = () =>
api.get("/order/client-orders")
.then(succcesStatus)
.catch(internalServerError)
export const orderDetailWs = () =>
api.get("/order/get/:id")
.then(succcesStatus)
.catch(internalServerError)
export const employeeOrdersWs = () =>
api.get("/order/work-orders")
.then(succcesStatus)
.catch(internalServerError)
export const orderEditWs = (data) =>
api.patch("/order/update/:id", data)
.then(succcesStatus)
.catch(internalServerError)
export const deleteOrderWs = () =>
api.delete("/order/delete/:id")
.then(succcesStatus)
.catch(internalServerError)

