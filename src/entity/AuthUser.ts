import type { GetAddressByCepResponse } from '@/types/responses/GetAddressByCepResponse';

export class AuthUserRole {
  id: number;
  nome: string;
  idSituacao: string;
}
export class AuthUserAdress {
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
export class AuthUserClient {
  id: number;
  cpf: string;
  telefone: string;
  planoId?: number | null;
  idUsuario: number;
  endereco: AuthUserAdress;
  constructor() {
    this.cpf = '';
    this.telefone = '';
    this.endereco = new AuthUserAdress();
  }
}
export class AuthUser {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  fotoPerfil: string | null;
  idCargo: number;
  cargo: AuthUserRole;
  idSituacao: number;
  idCliente?: number | null;
  cliente: AuthUserClient;
  constructor() {
    this.nomeCompleto = '';
    this.email = '';
    this.senha = '';
    this.fotoPerfil = '';
    this.cliente = new AuthUserClient();
  }
}
