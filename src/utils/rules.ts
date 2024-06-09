import { isValidCEP, isValidCPF, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';

export default class Rules {
  required(value: string): boolean | string {
    return !!value.trim() || 'O campo atual é necessário!';
  }
  min4Length(value: string): boolean | string {
    return value.trim().length >= 4 || 'O campo atual deve ter no mínimo 4 caracteres!';
  }
  validCpf(value: string): boolean | string {
    return isValidCPF(value) || 'CPF digitado inválido!';
  }
  validEmail(value: string): boolean | string {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email inválido.';
  }
  validTelephone(value: string): boolean | string {
    return isValidMobilePhone(value) || 'Telefone digitado inválido!';
  }
  validCep(value: string): boolean | string {
    return isValidCEP(value) || 'CEP digitado inválido!';
  }
  validNumber(value: string): boolean | string {
    return /^\d+$/.test(value) || 'Apenas números permitidos!';
  }
  validPassword(value: string): boolean | string {
    if (value.length < 8) return 'Sua senha deve ter no mínimo 8 caracteres!';
    const haveUpperCaseLetter = /[A-Z]/;
    if (!haveUpperCaseLetter.test(value)) return 'Sua senha deve ter no mínimo 1 letra maiúscula!';
    const haveLowerCaseLetter = /[a-z]/;
    if (!haveLowerCaseLetter.test(value)) return 'Sua senha deve ter no mínimo 1 letra minúscula!';
    const haveNumber = /[0-9]/;
    if (!haveNumber.test(value)) return 'Sua senha deve ter no mínimo 1 número!';
    const haveSpecialCaracter = /[!@#$%^&*(),.?":{}|<>_\-\\\\/\\[\]]/;
    if (!haveSpecialCaracter.test(value))
      return 'Sua senha deve ter no mínimo 1 caracter especial!';
    return true;
  }
  isEqualTo(value: string, otherValue: string) {
    return value === otherValue? true : 'As senhas devem ser iguais!'
  }
}
