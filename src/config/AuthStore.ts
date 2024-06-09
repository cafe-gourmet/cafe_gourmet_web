import type { User } from '@/entity/User';
import { createStore } from 'vuex';

export interface AuthState {
  user: User;
  userRoles: string[];
  tokenJwt: string;
}

const AuthStore = createStore<AuthState>({
  state(): AuthState {
    return {
      user: {} as User,
      userRoles: [] as string[],
      tokenJwt: ''
    };
  },
  mutations: {
    setUser(state: AuthState, user: User) {
      state.user = user;
    },
    setUserRoles(state: AuthState, roles: string[]) {
      state.userRoles = roles;
    },
    setTokenJwt(state: AuthState, tokenJwt: string) {
      state.tokenJwt = tokenJwt;
    }
  },
  getters: {
    getUser(state: AuthState) {
      return state.user;
    },
    getUserRoles(state: AuthState) {
      return state.userRoles;
    },
    getTokenJwt(state: AuthState) {
      return state.tokenJwt;
    }
  }
});

export default AuthStore;
