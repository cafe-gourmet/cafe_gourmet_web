import type { Category } from '@/entity/Category';
import type { Plan } from '@/entity/Plan';

export class ProductResponseDTO {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  codigoBarras: string;
  idCategoria: number;
  quantidade: number;
  percentualDescontoMensal: number;
  percentualDescontoAnual: number;
  categoria: Category;
  planos: Plan;
  anexos: object[];
}
