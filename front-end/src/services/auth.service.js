import axios from 'axios';
const API_URL = 'https://api.miramichipool.com/api/auth/';
class AuthService {
  login(creds) {
    return axios
      .post(API_URL + 'signin', {
        username: creds.username,
        password: creds.password,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(creds) {
    return axios.post(API_URL + 'signup', {
      firstName: creds.firstName,
      lastName: creds.lastName,
      username: creds.username,
      email: creds.email,
      password: creds.password
    });
  }
}
export default new AuthService();
