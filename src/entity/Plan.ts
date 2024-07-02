export class Plan {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  idSituacao: number;
  idPeriodo: number;
  imgPlano1?: string;
  imgPlano2?: string;
  imgPlano3?: string;
  periodo: PlanoPeriodo;
  situacao: Situacao;
}
export class PlanoPeriodo {
  id: number;
  descricao: string;
}
export class Situacao {
  id: number;
  descricao: string;
}