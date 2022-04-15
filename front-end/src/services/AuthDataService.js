import http from "../http-common";
class AuthDataService {
  login(creds) {
    return http.post("/login", creds);
  }
  register(creds) {
    return http.post("/login/register", creds);
  }
  logout() {
    return http.post(`/logout`);
  }
}
export default new AuthDataService();
