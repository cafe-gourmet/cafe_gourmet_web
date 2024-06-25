import AxiosAdapter from '@/config/AxiosAdapter';
import type { Product } from '@/entity/Product';

export default class ProductServices {
  private static readonly url = 'produto';

  static async getAll(): Promise<Product[]> {
    return await AxiosAdapter.get(this.url);
  }

  static async add(product: Product): Promise<Product> {
    return await AxiosAdapter.post(this.url, product);
  }
}
