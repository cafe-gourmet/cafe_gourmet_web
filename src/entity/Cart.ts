import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import type { Plan } from './Plan';
import type { User } from './User';

export class Cart {
  id?: number;
  idProduto?: number | null;
  idPlano?: number | null;
  qntProduto?: number | null;
  idCliente: number;
  statusCarrinho: boolean;
  statusCompra: boolean;
  cliente: Client;
  plano?: Plan;
  produto?: ProductResponseDTO;

  static createFromProductResponseDTO(product: ProductResponseDTO, idClient: number): Cart {
    const cart = new Cart();
    cart.idProduto = product.id;
    cart.qntProduto = product.quantidadeSelecionada;
    cart.idCliente = idClient;
    return cart;
  }

  static createFromPlan(plan: Plan, idClient: number): Cart {
    const cart = new Cart();
    cart.idPlano = plan.id;
    cart.idCliente = idClient;
    return cart;
  }
}
export class Client {
  id: number;
  cpf: string;
  telefone: string;
  planoId?: number;
  idUsuario: number;
  usuario: User;
}
