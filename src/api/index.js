import axios from 'axios'

//const url = "http://localhost:5000/"
const url = "https://rexshop.onrender.com/"

export const getItems = () => axios.get(`${url}items`)
export const getItem = (id) => axios.post(`${url}item/${id}`)
export const createItem = (data) => axios.post(`${url}createitem`, data)
export const updateItem = (id, data) => axios.patch(`${url}updateitem/${id}`, data)
export const deleteItem = (id) => axios.delete(`${url}deleteitem/${id}`)

export const signUp = (data) => axios.post(`${url}auth/signup`, data)
export const signIn = (data) => axios.post(`${url}auth/signin`, data)