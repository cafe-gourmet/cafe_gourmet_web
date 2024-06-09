import { Store } from 'vuex';
import { User } from '../src/entity/User';

declare module '@vue/runtime-core' {
  
  interface State {
    user: User;
    userRoles: string[];
    tokenJwt: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}


