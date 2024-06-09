import type { GetAddressByCepResponse } from '../types/responses/GetAddressByCepResponse';

export class UserAddress {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;

  constructor() {
    this.cep = '';
    this.estado = '';
    this.cidade = '';
    this.bairro = '';
    this.rua = '';
    this.numero = '';
  }

  fillByApiCepResponse(response: GetAddressByCepResponse) {
    this.cep = response.cep.replace('-', '');
    this.estado = response.uf;
    this.cidade = response.localidade;
    this.bairro = response.bairro;
    this.rua = response.logradouro;
  }
}

export class User {
  nomeCompleto: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
  endereco: UserAddress;
  fotoPerfil: string | null;

  constructor() {
    this.nomeCompleto = '';
    this.cpf = '';
    this.email = '';
    this.telefone = '';
    this.senha = '';
    this.fotoPerfil = '';
    this.endereco = new UserAddress();
  }
}
