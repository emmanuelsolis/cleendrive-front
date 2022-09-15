import { api } from './api'
import {succcesStatus, internalServerError} from '../utils/format-response'

export const manyUploadWs = (files) => 
api.post('/upload/uploads', files)
.then(succcesStatus)
.catch(internalServerError)
export const singleUploadWs = (file) =>
api.post('/upload/single', file)
.then(succcesStatus)
.catch(internalServerError)
export const deleteUploadWs = () =>
api.delete(`/upload/delete-image/:name`)





