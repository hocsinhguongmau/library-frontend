import axios from 'axios'

import { BACKEND_API_URL } from '@/constants'

export const fetchAllPublishers = async () => {
  const response = await axios.get(`${BACKEND_API_URL}/publishers.json`)
  return response.data
}
