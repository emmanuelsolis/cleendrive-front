import { api } from './api'
import {succcesStatus, internalServerError} from '../utils/format-response'

export const getAllUsersWs = () =>
api.get("/admin/all-users")
.then(succcesStatus)
.catch(internalServerError)