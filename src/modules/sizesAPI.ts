import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'

const authAPI = {
  async getSizes() {
    const response = await axios.get(API_URL + API_ROUTES.getSizes)

    return response.data.results
  }
}

export default authAPI
