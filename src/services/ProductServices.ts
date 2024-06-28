import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { ProductRequestDTO } from '@/types/requests/admin/ProductRequestDTO';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import type { Store } from 'vuex';

export default class ProductServices {
  private static readonly baseUrl = 'produto/';

  static async getAll(store: Store<MainState>): Promise<ProductResponseDTO[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }

  static async add(
    product: ProductRequestDTO,
    store: Store<MainState>
  ): Promise<ProductResponseDTO> {
    return await AxiosAdapter.post(this.baseUrl, store, product);
  }

  static async edit(
    product: ProductRequestDTO,
    store: Store<MainState>
  ): Promise<ProductResponseDTO> {
    return await AxiosAdapter.put(this.baseUrl + product.id, store, product);
  }

  static async delete(productId: number, store: Store<MainState>): Promise<ProductResponseDTO> {
    return await AxiosAdapter.delete(this.baseUrl + productId, store);
  }
}
