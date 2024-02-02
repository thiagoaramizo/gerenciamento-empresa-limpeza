"use-client"

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// Caso haja outras interfaces, como mobile ou desktop, é possível compartilhar este recurso.
export default api