import type { ProductResponseDTO } from "@/types/responses/admin/ProductResponseDTO";
import type { Plan } from "./Plan";
import type { User } from "./User";

export class Cart {
    id: number;
    idProduto?: number | null;
    idPlano?: number | null;
    qntProduto?: number | null;
    idCliente: number;
    statusCarrinho: boolean;
    statusCompra: boolean;
    cliente: Client;
    plano?: Plan;
    produto?: ProductResponseDTO;
}
export class Client {
id: number;
cpf: string;
telefone: string;
planoId?: number;
idUsuario: number;
usuario: User;
}
