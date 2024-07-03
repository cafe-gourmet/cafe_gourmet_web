import type { AuthUser } from '@/entity/AuthUser';
import type { Plan } from '@/entity/Plan';
import router from '@/router';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export interface CartStore {
  products: ProductResponseDTO[];
  plan: Plan | undefined;
  quantity: number;
}

export interface MainState {
  authUser: AuthUser | undefined;
  userRoles: string[];
  tokenJwt: string;
  cart: CartStore;
}

const MainStore = createStore<MainState>({
  state(): MainState {
    return {
      authUser: undefined,
      userRoles: [] as string[],
      tokenJwt: '',
      cart: {
        products: [] as ProductResponseDTO[],
        plan: undefined,
        quantity: 0
      }
    };
  },
  mutations: {
    setAuthUser(state: MainState, authUser: AuthUser) {
      state.authUser = authUser;
    },
    setUserRoles(state: MainState, roles: string[]) {
      state.userRoles = roles;
    },
    setTokenJwt(state: MainState, tokenJwt: string) {
      state.tokenJwt = tokenJwt;
    },
    addProductToCart(state: MainState, newProduct: ProductResponseDTO) {
      const productIndex: number = state.cart.products.findIndex(
        (product) => newProduct.id === product.id
      );

      if (productIndex !== -1) {
        state.cart.products[productIndex].quantidadeSelecionada = state.cart.products[
          productIndex
        ].quantidadeSelecionada += 1;
      } else {
        state.cart.products.push(newProduct);
        newProduct.quantidadeSelecionada = 1;
      }
      state.cart.quantity = state.cart.quantity += 1;
    },
    addPlanToCart(state: MainState, plan: Plan) {
      if (!state.cart.plan) state.cart.quantity = state.cart.quantity += 1;
      state.cart.plan = plan;
    },
    removeProductInCart(state: MainState, productId: number) {
      const productIndex: number = state.cart.products.findIndex(
        (product) => productId === product.id
      );
      state.cart.quantity = state.cart.quantity -=
        state.cart.products[productIndex].quantidadeSelecionada;
      state.cart.products = state.cart.products.filter((product) => product.id !== productId);
    },
    removePlanInCart(state: MainState) {
      state.cart.quantity = state.cart.quantity -= 1;
      state.cart.plan = undefined;
    },
    logout(state) {
      state.authUser = undefined;
      state.userRoles = [];
      state.tokenJwt = '';
      state.cart = {
        products: [] as ProductResponseDTO[],
        plan: undefined,
        quantity: 0
      };
    }
  },
  getters: {
    getAuthUser(state: MainState) {
      return state.authUser;
    },
    getUserRoles(state: MainState) {
      return state.userRoles;
    },
    getTokenJwt(state: MainState) {
      return state.tokenJwt;
    },
    getCart(state: MainState) {
      return state.cart;
    },
    getCartQuantity(state: MainState) {
      return state.cart.quantity;
    },
    isAdmin(state: MainState) {
      return state.authUser?.idCargo === 1;
    },
    isClient(state: MainState) {
      return state.authUser?.idCargo === 2;
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
      key: 'MainStore',
      paths: ['user', 'userRoles', 'tokenJwt', 'authUser', 'cart'],
      storage: window.localStorage
    })
  ]
});

export default MainStore;
