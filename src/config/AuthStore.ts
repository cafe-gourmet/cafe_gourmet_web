import type { AuthUser } from '@/entity/AuthUser';
import { User } from '@/entity/User';
import router from '@/router';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export interface AuthState {
  user: User;
  authUser: AuthUser;
  userRoles: string[];
  tokenJwt: string;
}

const AuthStore = createStore<AuthState>({
  state(): AuthState {
    return {
      user: {} as User,
      authUser: {} as AuthUser,
      userRoles: [] as string[],
      tokenJwt: ''
    };
  },
  mutations: {
    setUser(state: AuthState, user: User) {
      state.user = user;
    },
    setAuthUser(state: AuthState, authUser: AuthUser) {
      state.authUser = authUser;
    },
    setUserRoles(state: AuthState, roles: string[]) {
      state.userRoles = roles;
    },
    setTokenJwt(state: AuthState, tokenJwt: string) {
      state.tokenJwt = tokenJwt;
    },
    logout(state) {
      state.user = new User();
      state.userRoles = [];
      state.tokenJwt = '';
    }
  },
  getters: {
    getUser(state: AuthState) {
      return state.user;
    }, 
    getAuthUser(state: AuthState) {
      return state.authUser;
    },
    getUserRoles(state: AuthState) {
      return state.userRoles;
    },
    getTokenJwt(state: AuthState) {
      return state.tokenJwt;
    }
  },
  actions: {
    logout({ commit }) {
      commit('logout');
      router.push('/');
    }
  },
  plugins: [
    createPersistedState({
      key: 'authStore',
      paths: ['user', 'userRoles', 'tokenJwt', 'authUser'],
      storage: window.localStorage
    })
  ]
});

export default AuthStore;
