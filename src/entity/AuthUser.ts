import type { GetAddressByCepResponse } from '../types/responses/GetAddressByCepResponse';

export class AuthUserRole {
  id: number;
  nome: string;
  idSituacao: string;
}
export class AuthUserClient{
  id:number;
  cpf: string;
  telefone: string
  planoId: number;
  idUsuario: number;
}
export class AuthUser {
  nomeCompleto: string;
  email: string;
  senha: string;
  fotoPerfil: string | null;
  idCargo: number;
  cargo: AuthUserRole;
  idSituacao: number;
  idCliente?: number | null;
  cliente?: AuthUserClient | null;
}