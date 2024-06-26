import { User } from '@/entity/User';
import router from '@/router';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
      paths: ['user', 'userRoles', 'tokenJwt'],
      storage: window.localStorage
    })
  ]
});

export default AuthStore;
