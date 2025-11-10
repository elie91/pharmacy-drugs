/**
 * Utility functions for managing drug benefit values
 */

const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;

/**
 * Clamps a benefit value between MIN_BENEFIT and MAX_BENEFIT
 * @param {number} benefit - The benefit value to clamp
 * @returns {number} The clamped benefit value
 */
export function clampBenefit(benefit) {
  return Math.max(MIN_BENEFIT, Math.min(MAX_BENEFIT, benefit));
}

/**
 * Increases benefit by a given amount, respecting the maximum
 * @param {number} currentBenefit - Current benefit value
 * @param {number} amount - Amount to increase
 * @returns {number} The new benefit value
 */
export function increaseBenefit(currentBenefit, amount) {
  return clampBenefit(currentBenefit + amount);
}

/**
 * Decreases benefit by a given amount, respecting the minimum
 * @param {number} currentBenefit - Current benefit value
 * @param {number} amount - Amount to decrease
 * @returns {number} The new benefit value
 */
export function decreaseBenefit(currentBenefit, amount) {
  return clampBenefit(currentBenefit - amount);
}

export { MIN_BENEFIT, MAX_BENEFIT };
