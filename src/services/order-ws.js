import { api } from './api'
import {successStatus, internalServerError} from '../utils/format-response'

export const takeOrderWs = (data) =>
api.patch("/order/pending/:id", data)
.then(successStatus)
.catch(internalServerError)
export const placeOrderWs = (data) =>
api.post("/order/place", data)
.then(successStatus)
.catch(internalServerError)
export const myOrdersWs = () =>
api.get("/order/client-orders")
.then(successStatus)
.catch(internalServerError)
export const orderDetailWs = () =>
api.get("/order/get/:id")
.then(successStatus)
.catch(internalServerError)
export const employeeOrdersWs = () =>
api.get("/order/work-orders")
.then(successStatus)
.catch(internalServerError)
export const orderEditWs = (data) =>
api.patch("/order/update/:id", data)
.then(successStatus)
.catch(internalServerError)
export const deleteOrderWs = () =>
api.delete("/order/delete/:id")
.then(successStatus)
.catch(internalServerError)

