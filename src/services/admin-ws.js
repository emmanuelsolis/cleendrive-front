import { api } from './api'
import {successStatus, internalServerError} from '../utils/format-response'

export const getAllUsersWs = () =>
api.get("/admin/all-users")
.then(successStatus)
.catch(internalServerError)