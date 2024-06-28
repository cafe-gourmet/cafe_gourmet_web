import axios from 'axios';
import type { Store } from 'vuex';
import { type MainState } from './MainStore';

export default class AxiosAdapter {
  private static readonly baseUrl = 'http://localhost:3000/';

  static async auth(url: string, data: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data
    });
    return response.data;
  }

  static async register(url: string, data: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data
    });
    return response.data;
  }

  static async get(url: string, store: Store<MainState>, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'get',
      params,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async post(url: string, store: Store<MainState>, data?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'post',
      data,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async put(url: string, store: Store<MainState>, data?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'put',
      data,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  static async delete(url: string, store: Store<MainState>, params?: any) {
    const response = await axios({
      url: `${this.baseUrl}${url}`,
      method: 'delete',
      params,
      headers: this.getHeaders(store)
    });
    return response.data;
  }

  private static getHeaders(store: Store<MainState>) {
    return {
      Authorization: `Bearer ${store.getters.getTokenJwt}`,
      roles: undefined
    };
  }
}
