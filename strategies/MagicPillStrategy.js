import { DrugStrategy } from "./DrugStrategy.js";

/**
 * Strategy for Magic Pill
 * - Never expires
 * - Benefit never decreases
 */
export class MagicPillStrategy extends DrugStrategy {
  updateExpiration(drug) {
    // Magic Pill never expires, so we don't decrease expiresIn
  }

  updateBenefit(drug) {
    // Magic Pill benefit never changes
  }
}
