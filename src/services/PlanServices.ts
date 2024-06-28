import type { MainState } from '@/config/MainStore';
import AxiosAdapter from '@/config/AxiosAdapter';
import type { Plan } from '@/entity/Plan';
import type { Store } from 'vuex';

export default class PlanServices {
  private static readonly baseUrl = 'plano/';

  static async getAll(store: Store<MainState>): Promise<Plan[]> {
    return await AxiosAdapter.get(this.baseUrl + 'find', store);
  }

  static async add(plan: Plan, store: Store<MainState>): Promise<Plan> {
    const planRequest = this.createPlanRequest(plan);
    delete planRequest.id;
    return await AxiosAdapter.post(this.baseUrl, store, planRequest);
  }

  static async edit(plan: Plan, store: Store<MainState>): Promise<Plan> {
    const planRequest = this.createPlanRequest(plan);
    return await AxiosAdapter.put(this.baseUrl + plan.id, store, planRequest);
  }

  static async delete(planId: number, store: Store<MainState>): Promise<Plan> {
    return await AxiosAdapter.delete(this.baseUrl + planId, store);
  }

  static createPlanRequest(plan: Plan) {
    plan.id = Number(plan.id);
    plan.preco = Number(plan.preco);
    plan.idSituacao = Number(plan.idSituacao);
    plan.idPeriodo = Number(plan.idPeriodo);
    return plan;
  }
}
