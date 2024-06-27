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
  imgProduto1?: string;
  imgProduto2?: string;
  imgProduto3?: string;

  static createByProductResponseDTO(product: ProductResponseDTO) {
    const productRequestDTO = new ProductRequestDTO();
    productRequestDTO.id = Number(product.id);
    productRequestDTO.nome = product.nome;
    productRequestDTO.marca = product.marca;
    productRequestDTO.preco = Number(product.preco);
    productRequestDTO.codigoBarras = product.codigoBarras;
    productRequestDTO.idCategoria = Number(product.idCategoria);
    productRequestDTO.quantidade = Number(product.quantidade);
    productRequestDTO.percentualDescontoMensal = Number(product.percentualDescontoMensal);
    productRequestDTO.percentualDescontoAnual = Number(product.percentualDescontoAnual);
    productRequestDTO.imgProduto1 = product.imgProduto1;
    productRequestDTO.imgProduto2 = product.imgProduto2;
    productRequestDTO.imgProduto3 = product.imgProduto3;
    return productRequestDTO;
  }
}
