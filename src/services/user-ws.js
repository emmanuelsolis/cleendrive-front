//import api // default donde tengo mi URL baseURL
import { api } from './api'
import {successStatus, internalServerError} from '../utils/format-response'


export const editUserWs = (data) => 
api.patch("/user/edit-profile", data)//lefalta .then y .catch
.then(successStatus)
.catch(internalServerError)
export const profileWs = () =>
api.get('/user/profile')
.then(successStatus)
.catch(internalServerError)
export const myProfileWs = (id) =>
api.get(`/user/${id}/profile`)
.then(successStatus)
.catch(internalServerError)
export const deleteProfileWs = () =>
api.delete("/user/delete-user")
.then(successStatus)
.catch(internalServerError)



