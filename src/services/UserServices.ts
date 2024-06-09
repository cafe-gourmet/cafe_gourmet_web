import AxiosAdapter from '@/config/AxiosAdapter';
import type { User } from '@/entity/User';

export default class UserServices {
  static async register(user: User): Promise<string[]> {
    const roles = await AxiosAdapter.post('usuario', user);
    return roles;
  }

  static async login(email: string, password: string): Promise<string[]> {
    const roles: string[] = await AxiosAdapter.post('');
    return roles;
  }
}
