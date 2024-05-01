import type { GetAddressByCepResponse } from "../responses/GetAddressByCepResponse";

export class RegisterFormAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;

  constructor() {
    this.cep = '';
    this.state = '';
    this.city = '';
    this.neighborhood = '';
    this.street = '';
    this.number = '';
  }

  fillByApiCepResponse(response: GetAddressByCepResponse) {
    this.cep = response.cep.replace('-', '');
    this.state = response.uf;
    this.city = response.localidade;
    this.neighborhood = response.bairro;
    this.street = response.logradouro;
  }
}

export class RegisterForm {
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  password: string;
  passwordRepeated: string;
  address: RegisterFormAddress;

  constructor() {
    this.name = '';
    this.cpf = '';
    this.email = '';
    this.telephone = '';
    this.password = '';
    this.passwordRepeated = '';
    this.address = new RegisterFormAddress();
  }
}
