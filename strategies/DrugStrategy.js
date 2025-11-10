/**
 * Abstract base class for drug update strategies
 * Each drug type will have its own strategy implementation
 */
export class DrugStrategy {
  /**
   * Updates a drug's benefit and expiration values
   * @param {Drug} drug - The drug to update
   */
  update(drug) {
    this.updateExpiration(drug);
    this.updateBenefit(drug);
  }

  /**
   * Updates the expiration date of the drug
   * @param {Drug} drug - The drug to update
   */
  updateExpiration(drug) {
    drug.expiresIn -= 1;
  }

  /**
   * Updates the benefit value of the drug
   * Must be implemented by subclasses
   * @param {Drug} drug - The drug to update
   */
  updateBenefit(drug) {
    throw new Error("updateBenefit must be implemented by subclass");
  }

  /**
   * Checks if the drug has expired
   * @param {Drug} drug - The drug to check
   * @returns {boolean} True if expired
   */
  isExpired(drug) {
    return drug.expiresIn < 0;
  }
}
