import axios from 'axios'

const API_URL = 'http://localhost:8085/api/v2'
const http = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL || API_URL })

export default http
