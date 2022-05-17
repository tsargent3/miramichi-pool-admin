import axios from 'axios';
import authHeader from './auth.header';
const API_URL = 'https://api.miramichipool.com/api/interaction/';
class InteractionService {
  create(interaction) {
    return axios
      .post(API_URL + 'create', {
        customerId: interaction.customerId,
        userId: interaction.author.id,
        message: interaction.message,
        important: interaction.important,
      },
      {
        headers: authHeader()
      });
  }
  get(customer_id) {
    return axios
      .get(API_URL + customer_id,
        {
          headers: authHeader()
        });
  }
  delete(interaction_id) {
    return axios
      .delete(API_URL + interaction_id,
        {
          headers: authHeader()
        });
  }
}
export default new InteractionService();
