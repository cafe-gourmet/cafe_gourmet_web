import type { Category } from '@/entity/Category';

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
  imgProduto1?: string;
  imgProduto2?: string;
  imgProduto3?: string;
  quantidadeSelected?: number;
}
