import axios from 'axios'

import { BACKEND_API_URL } from '@/constants'

export const fetchAllBooks = async () => {
  const response = await axios.get(`${BACKEND_API_URL}/books.json`)
  return response.data
}

// export const addBookFunction = async (book: IBook) => {
//   const response = await axios.post(`${BACKEND_API_URL}/books.json`, book)
//   console.log('book is added', book)
//   return response.data
// }

// export const updateBookFunction = async (id: number, book: IBook) => {
//   const response = await axios.put(`${BACKEND_API_URL}/books.json`, book)
//   console.log(`book ${id} is updated`, book)
//   return response.data
// }

// export const removeBookFunction = async (id: number) => {
//   const response = await axios.delete(`${BACKEND_API_URL}/books.json`)
//   console.log(response.data)
//   console.log(`book ${id} is deleted`)
//   return response.data
// }
