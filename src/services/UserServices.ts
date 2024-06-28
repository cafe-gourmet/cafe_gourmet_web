import type { AuthState } from '@/config/AuthStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Auth } from '@/entity/Auth';
import type { AuthUser } from '@/entity/AuthUser';
import type { User } from '@/entity/User';
import type { Store } from 'vuex';

export default class UserServices {
  static async register(user: User): Promise<string[]> {
    const roles = await AxiosAdapter.register('usuario', user);
    return roles;
  }

  static async login(auth: Auth): Promise<string[]> {
    const roles: string[] = await AxiosAdapter.auth('autenticacao/login', auth);
    return roles;
  }

  static async getProfile(store: Store<AuthState>): Promise<AuthUser> {
    const authUser: AuthUser = await AxiosAdapter.get('autenticacao/profile',store);
    return authUser;
  }

  static logout(store: Store<AuthState>): void {
    store.dispatch('logout');
  }
}
