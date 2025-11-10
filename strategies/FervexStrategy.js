import { DrugStrategy } from "./DrugStrategy.js";
import { increaseBenefit } from "../utils/benefitHelper.js";

/**
 * Strategy for Fervex
 * - Increases in benefit as expiration approaches
 * - Increases by 1 per day normally
 * - Increases by 2 per day when 10 days or less remain
 * - Increases by 3 per day when 5 days or less remain
 * - Drops to 0 after expiration
 */
export class FervexStrategy extends DrugStrategy {
  updateBenefit(drug) {
    if (this.isExpired(drug)) {
      // After expiration, benefit drops to 0
      drug.benefit = 0;
    } else {
      // Before expiration, benefit increases based on days remaining
      const increaseRate = this.getIncreaseRate(drug);
      drug.benefit = increaseBenefit(drug.benefit, increaseRate);
    }
  }

  /**
   * Determines the benefit increase rate based on days until expiration
   * @param {Drug} drug - The drug to check
   * @returns {number} The increase rate
   */
  getIncreaseRate(drug) {
    if (drug.expiresIn < 5) {
      return 3;
    } else if (drug.expiresIn < 10) {
      return 2;
    } else {
      return 1;
    }
  }
}
