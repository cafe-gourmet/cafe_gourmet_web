import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';

export class ProductRequestDTO {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  codigoBarras: string;
  idCategoria: number;
  quantidade: number;
  percentualDescontoMensal: number;
  percentualDescontoAnual: number;

  static createByProductResponseDTO(product: ProductResponseDTO) {
    const productRequestDTO = new ProductRequestDTO();
    productRequestDTO.id = product.id;
    productRequestDTO.nome = product.nome;
    productRequestDTO.marca = product.marca;
    productRequestDTO.preco = Number(product.preco);
    productRequestDTO.codigoBarras = product.codigoBarras;
    productRequestDTO.idCategoria = Number(product.idCategoria);
    productRequestDTO.quantidade = Number(product.quantidade);
    productRequestDTO.percentualDescontoMensal = Number(product.percentualDescontoMensal);
    productRequestDTO.percentualDescontoAnual = Number(product.percentualDescontoAnual);
    return productRequestDTO;
  }
}
