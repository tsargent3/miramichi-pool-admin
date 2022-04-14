import http from "../http-common";
class AuthDataService {
  async login(creds) {
    return http.post("/login/");
  }
  logout() {
    return http.post(`/logout/`);
  }
}
export default new AuthDataService();
