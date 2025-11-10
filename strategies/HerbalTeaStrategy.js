import { DrugStrategy } from "./DrugStrategy.js";
import { increaseBenefit } from "../utils/benefitHelper.js";

/**
 * Strategy for Herbal Tea
 * - Increases in benefit over time
 * - Increases by 1 per day normally
 * - Increases by 2 per day after expiration
 */
export class HerbalTeaStrategy extends DrugStrategy {
  updateBenefit(drug) {
    const increaseRate = this.isExpired(drug) ? 2 : 1;
    drug.benefit = increaseBenefit(drug.benefit, increaseRate);
  }
}
