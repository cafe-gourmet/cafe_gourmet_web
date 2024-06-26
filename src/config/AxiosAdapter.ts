import axios from 'axios';
import AuthStore, { type AuthState } from './AuthStore';
import type { Store } from 'vuex';

export default class AxiosAdapter {
  private static readonly baseUrl = 'http://localhost:3000/';

  static async auth(url: string, data: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data
    });
    return response.data.access_token;
  }

  static async get(url: string, store: Store<AuthState>, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'get',
      params,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async post(url: string, store: Store<AuthState>, data?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async put(url: string, store: Store<AuthState>, data?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'put',
      data,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async delete(url: string, store: Store<AuthState>, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'delete',
      params,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  private static getHeaders(store: Store<AuthState>) {
    return {
      Authorization: `Bearer ${store.getters.getTokenJwt}`,
      roles: undefined
    };
  }
}
