import { api } from './api'
import {successStatus, internalServerError} from '../utils/format-response'


export const createServiceWs = (data) => 
api.post("/cleanservices/create-service", data)
.then(successStatus)
.catch(internalServerError)
export const serviceDetailWs = () =>
api.get("/cleanservices/get-service/:id")
.then(successStatus)
.catch(internalServerError)
export const serviceListWs = () =>
api.get("/cleanservices/all-services")
.then(successStatus)
.catch(internalServerError)
export const serviceEditWs = (data) =>
api.put("/cleanservices/update-service/:id", data)
.then(successStatus)
.catch(internalServerError)
export const serviceDeleteWs = () =>
api.delete("/cleanservices/delete-service/:id")
.then(successStatus)
.catch(internalServerError)