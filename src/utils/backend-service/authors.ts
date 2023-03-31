import axios from 'axios'

import { BACKEND_API_URL } from '@/constants'

export const fetchAllAuthors = async () => {
  const response = await axios.get(`${BACKEND_API_URL}/authors.json`)
  return response.data
}

// export const addAuthorFunction = async (author: IAuthor) => {
//   const response = await axios.post(`${BACKEND_API_URL}/authors.json`, author)
//   console.log('author is added', author)
//   return response.data
// }

// export const updateAuthorFunction = async (id: number, author: IAuthor) => {
//   const response = await axios.put(`${BACKEND_API_URL}/authors.json`, author)
//   console.log(`author ${id} is updated`, author)
//   return response.data
// }

// export const removeAuthorFunction = async (id: number) => {
//   const response = await axios.delete(`${BACKEND_API_URL}/authors.json`)
//   console.log(response.data)
//   console.log(`author ${id} is deleted`)
//   return response.data
// }
