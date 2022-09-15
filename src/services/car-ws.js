//import api // default donde tengo mi URL baseURL
import { api } from './api'
import {succcesStatus, internalServerError} from '../utils/format-response'


export const carRegisterWs = (data) =>
api.post("/car/register-car", data)
.then(succcesStatus)
.catch(internalServerError)
export const carDetailWs = () =>
api.get("/car/get-one/:carPlate")
.then(succcesStatus)
.catch(internalServerError)
export const carListWs = () =>
api.get("/car/get-cars")
.then(succcesStatus)
.catch(internalServerError)
export const carEditWs = (data) =>
api.patch("/car/edit-car/:id", data)
.then(succcesStatus)
.catch(internalServerError)
export const carDeleteWs = (data) =>
api.delete("/car/delete-car/:id", data)
.then(succcesStatus)
.catch(internalServerError)