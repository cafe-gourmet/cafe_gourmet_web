import type { AuthState } from '@/config/AuthStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Auth } from '@/entity/Auth';
import type { User } from '@/entity/User';
import type { Store } from 'vuex';

export default class UserServices {
  static async register(user: User): Promise<string[]> {
    const roles = await AxiosAdapter.post('usuario', user);
    return roles;
  }

  static async login(auth: Auth, store: Store<AuthState>): Promise<string[]> {
    const roles: string[] = await AxiosAdapter.auth('autenticacao/login', auth, store);
    return roles;
  }
}
