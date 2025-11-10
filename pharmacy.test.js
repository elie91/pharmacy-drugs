import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Normal Drugs (e.g., Doliprane)", () => {
    it("should decrease benefit and expiresIn by 1 each day", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 10, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(9);
      expect(pharmacy.drugs[0].benefit).toBe(19);
    });

    it("should degrade benefit twice as fast after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 0, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(-1);
      expect(pharmacy.drugs[0].benefit).toBe(18); // -2 instead of -1
    });

    it("should never have negative benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 5, 0)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(0);
    });

    it("should handle benefit reaching 0 after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", -1, 1)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(0); // 1 - 2 = -1, clamped to 0
    });
  });

  describe("Dafalgan (NEW)", () => {
    it("should decrease benefit by 2 per day before expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(9);
      expect(pharmacy.drugs[0].benefit).toBe(18); // -2 per day
    });

    it("should decrease benefit by 4 per day after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(-1);
      expect(pharmacy.drugs[0].benefit).toBe(16); // -4 per day after expiration
    });

    it("should never have negative benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 5, 1)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(0); // 1 - 2 = -1, clamped to 0
    });

    it("should handle rapid degradation after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", -1, 3)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(0); // 3 - 4 = -1, clamped to 0
    });
  });
});
