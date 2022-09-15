//import api // default donde tengo mi URL baseURL
import { api } from './api'
import {succcesStatus, internalServerError} from '../utils/format-response'


export const editUserWs = (data) => 
api.patch("/user/edit-profile", data)//lefalta .then y .catch
.then(succcesStatus)
.catch(internalServerError)
export const profileWs = () =>
api.get('/user/profile')
.then(succcesStatus)
.catch(internalServerError)
export const myProfileWs = () =>
api.get("/user/:id/profile")
.then(succcesStatus)
.catch(internalServerError)
export const deleteProfileWs = () =>
api.delete("/user/delete-user")
.then(succcesStatus)
.catch(internalServerError)



