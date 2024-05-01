import type { GetAddressByCepResponse } from '@/types/responses/GetAddressByCepResponse';
import axios, { type AxiosResponse } from 'axios';

export class ExternalServices {
  static async getAddressByCep(cep: string): Promise<GetAddressByCepResponse> {
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    const response: AxiosResponse<GetAddressByCepResponse> = await axios({
      url,
      method: 'get'
    });

    return response.data;
  }
}
