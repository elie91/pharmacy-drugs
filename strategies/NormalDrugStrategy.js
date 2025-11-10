import { DrugStrategy } from "./DrugStrategy.js";
import { decreaseBenefit } from "../utils/benefitHelper.js";

/**
 * Strategy for normal drugs (e.g., Doliprane)
 * - Loses 1 benefit per day
 * - Loses 2 benefit per day after expiration
 */
export class NormalDrugStrategy extends DrugStrategy {
  updateBenefit(drug) {
    const degradationRate = this.isExpired(drug) ? 2 : 1;
    drug.benefit = decreaseBenefit(drug.benefit, degradationRate);
  }
}
