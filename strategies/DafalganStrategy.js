import { DrugStrategy } from "./DrugStrategy.js";
import { decreaseBenefit } from "../utils/benefitHelper.js";

/**
 * Strategy for Dafalgan
 * - Degrades twice as fast as normal drugs
 * - Loses 2 benefit per day
 * - Loses 4 benefit per day after expiration
 */
export class DafalganStrategy extends DrugStrategy {
  updateBenefit(drug) {
    const degradationRate = this.isExpired(drug) ? 4 : 2;
    drug.benefit = decreaseBenefit(drug.benefit, degradationRate);
  }
}
