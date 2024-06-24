import axios from 'axios';
import AuthStore from './AuthStore';

export default class AxiosAdapter {
  private static readonly baseUrl = 'http://localhost:3000/';

  static async get(url: string, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'get',
      params,
      headers: {
        Authorization: this.getAuthToken(),
        roles: this.getUserRoles()
      }
    });
    return response.data;
  }

  static async post(url: string, data?: any) {
    console.log(data, url, this.baseUrl)
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data,
      headers: {
        Authorization: this.getAuthToken(),
        roles: this.getUserRoles()
      }
    });
    return response.data;
  }
  
  static async auth(url: string, data?: any) {
    console.log(data, url, this.baseUrl)
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data
    });

    this.setAuthToken(response.data.access_token);
    return response.data;
  }

  static async put(url: string, data?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'put',
      data,
      headers: {
        Authorization: this.getAuthToken(),
        roles: this.getUserRoles()
      }
    });
    return response.data;
  }

  static async delete(url: string, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'delete',
      params,
      headers: {
        Authorization: this.getAuthToken(),
        roles: this.getUserRoles()
      }
    });
    return response.data;
  }

  private static getAuthToken(): string {
    return AuthStore.getters.getTokenJwt;
  }
  private static setAuthToken(token : string): string {
    return AuthStore.state.tokenJwt = token;
  }
  private static getUserRoles(): string[] {
    return AuthStore.getters.getUserRoles;
  }
}
