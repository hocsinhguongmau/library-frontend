import axios from 'axios'

import { BACKEND_API_URL } from '@/constants'

export const fetchAllCategories = async () => {
  const response = await axios.get(`${BACKEND_API_URL}/categories.json`)
  return response.data
}
