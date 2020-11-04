import axios from 'axios'
import config from '../config'

export default axios.create({
    baseURL: config.baseUrl,
    headers: {
        'Content-type': 'application/json ',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '
    }
})