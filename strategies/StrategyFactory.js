import { NormalDrugStrategy } from "./NormalDrugStrategy.js";
import { DafalganStrategy } from "./DafalganStrategy.js";

/**
 * Factory for creating drug strategies based on drug name
 */
export class StrategyFactory {
  static strategies = new Map([["Dafalgan", DafalganStrategy]]);

  /**
   * Creates the appropriate strategy for a given drug name
   * @param {string} drugName - The name of the drug
   * @returns {DrugStrategy} The strategy instance
   */
  static create(drugName) {
    const StrategyClass = this.strategies.get(drugName);

    if (StrategyClass) {
      return new StrategyClass();
    }

    // Default to normal drug strategy
    return new NormalDrugStrategy();
  }

  /**
   * Registers a new drug strategy
   * @param {string} drugName - The name of the drug
   * @param {Class} StrategyClass - The strategy class
   */
  static register(drugName, StrategyClass) {
    this.strategies.set(drugName, StrategyClass);
  }
}
