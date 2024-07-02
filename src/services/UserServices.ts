import AxiosAdapter from '@/config/AxiosAdapter';
import type { MainState } from '@/config/MainStore';
import type { Auth } from '@/entity/Auth';
import type { AuthUser } from '@/entity/AuthUser';
import { User, UserAddress } from '@/entity/User';
import type { Store } from 'vuex';

export default class UserServices {
  static async register(user: User): Promise<AuthUser> {
    return await AxiosAdapter.register('usuario', user);
  }

  static async createUser(user: AuthUser, store: Store<MainState>) {
    return await AxiosAdapter.post('usuario/create-user', store, user);
  }

  static async updateUser(user: AuthUser, store: Store<MainState>) {
    return await AxiosAdapter.put('usuario/update-user', store, user);
  }

  static async findAll(store: Store<MainState>): Promise<AuthUser[]> {
    return await AxiosAdapter.get('usuario/find', store);
  }

  static async update(user: AuthUser, store: Store<MainState>): Promise<AuthUser> {
    const usuario = new User();
    const endereco = new UserAddress();

    endereco.cep = user.cliente!.endereco.cep;
    endereco.bairro = user.cliente!.endereco.bairro;
    endereco.rua = user.cliente!.endereco.rua;
    endereco.cidade = user.cliente!.endereco.cidade;
    endereco.estado = user.cliente!.endereco.estado;
    endereco.numero = user.cliente!.endereco.numero;

    usuario.cpf = user.cliente!.cpf;
    usuario.id = user.id;
    usuario.email = user.email;
    usuario.fotoPerfil = user.fotoPerfil;
    usuario.nomeCompleto = user.nomeCompleto;
    usuario.senha = user.senha;
    usuario.telefone = user.cliente!.telefone;
    usuario.endereco = endereco;

    return await AxiosAdapter.put('usuario', store, usuario);
  }
  static async login(auth: Auth) {
    return await AxiosAdapter.auth('autenticacao/login', auth);
  }

  static async delete(userId: number, store: Store<MainState>) {
    return await AxiosAdapter.delete(`usuario/${userId}`, store);
  }

  static logout(store: Store<MainState>): void {
    store.dispatch('logout');
  }
}
