import AxiosAdapter from '@/config/AxiosAdapter';
import type { Auth } from '@/entity/Auth';
import type { User } from '@/entity/User';

export default class UserServices {
  static async register(user: User): Promise<string[]> {
    const roles = await AxiosAdapter.post('usuario', user);
    return roles;
  }

  static async login(auth: Auth): Promise<string[]> {
    const roles: string[] = await AxiosAdapter.auth('autenticacao/login',auth);
    return roles;
  }
}
