import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Auth } from '@/entity/Auth';
import { User, UserAddress } from '@/entity/User';
import type { Store } from 'vuex';
import type { AuthUser } from '@/entity/AuthUser';

export default class UserServices {
  static async register(user: User): Promise<string[]> {
    const roles = await AxiosAdapter.register('usuario', user);
    return roles;
  }
  static async update(user: AuthUser, store: Store<MainState>): Promise<string[]> {
    const usuario = new User()
    const endereco = new UserAddress();

    endereco.cep=user.cliente!.endereco.cep;
    endereco.bairro = user.cliente!.endereco.bairro;
    endereco.rua= user.cliente!.endereco.rua;
    endereco.cidade= user.cliente!.endereco.cidade;
    endereco.estado= user.cliente!.endereco.estado;
    endereco.numero= user.cliente!.endereco.numero;

    usuario.cpf = user.cliente!.cpf;
    usuario.id = user.id;
    usuario.email = user.email;
    usuario.fotoPerfil = user.fotoPerfil;
    usuario.nomeCompleto = user.nomeCompleto;
    usuario.senha = user.senha;
    usuario.telefone = user.cliente!.telefone;
    usuario.endereco = endereco;

    const roles = await AxiosAdapter.put('usuario',store, usuario);
    return roles;
  }
  static async login(auth: Auth) {
    return await AxiosAdapter.auth('autenticacao/login', auth);
  }

  static logout(store: Store<MainState>): void {
    store.dispatch('logout');
  }
}
