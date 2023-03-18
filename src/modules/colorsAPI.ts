import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'

const authAPI = {
  async getColors() {
    const response = await axios.get(API_URL + API_ROUTES.getColors)

    return response.data.results
  }
}

export default authAPI
