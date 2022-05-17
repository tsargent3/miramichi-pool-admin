import axios from 'axios';
import authHeader from './auth.header';
const API_URL = 'https://api.miramichipool.com/api/customer/';
class CustomerService {
  create(customer) {
    return axios
      .post(API_URL + 'create', {
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        status: customer.status,
        postalCode: customer.postalCode,
        email: customer.email,
        phone: customer.phone,
      },
      {
        headers: authHeader()
      });
  }
  delete(customer_id) {
    return axios
      .delete(API_URL + customer_id,
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
  getAll() {
    return axios
      .get(API_URL,
        {
          headers: authHeader()
        });
  }
  update(customer_id, customer) {
    return axios.post(API_URL + customer_id + '/update', {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      postalCode: customer.postalCode
    },
    {
      headers: authHeader()
    });
  }
  updateStatus(customer_id, data) {
    return axios.post(API_URL + customer_id + '/status-update', {
      status: data.status,
    },
    {
      headers: authHeader()
    });
  }
  notifyUpdate(customer_id, timestamp) {
    return axios.post(API_URL + customer_id + '/notify-update', {
      timestamp
    },
    {
      headers: authHeader()
    });
  }
}
export default new CustomerService();
