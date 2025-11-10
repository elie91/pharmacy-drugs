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

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 before expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 10, 5)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(9);
      expect(pharmacy.drugs[0].benefit).toBe(6);
    });

    it("should increase benefit by 2 after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 5)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(-1);
      expect(pharmacy.drugs[0].benefit).toBe(7); // +2 instead of +1
    });

    it("should never exceed benefit of 50", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 10, 50)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(50);
    });

    it("should cap benefit at 50 even after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", -1, 49)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(50); // 49 + 2 = 51, capped at 50
    });
  });

  describe("Magic Pill", () => {
    it("should never expire or decrease in benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 15, 40)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(15);
      expect(pharmacy.drugs[0].benefit).toBe(40);
    });

    it("should remain unchanged after multiple days", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 15, 40)]);

      for (let i = 0; i < 10; i++) {
        pharmacy.updateBenefitValue();
      }

      expect(pharmacy.drugs[0].expiresIn).toBe(15);
      expect(pharmacy.drugs[0].benefit).toBe(40);
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days remain", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 15, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(14);
      expect(pharmacy.drugs[0].benefit).toBe(21);
    });

    it("should increase benefit by 2 when 10 days or less remain", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 10, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(9);
      expect(pharmacy.drugs[0].benefit).toBe(22);
    });

    it("should increase benefit by 3 when 5 days or less remain", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 5, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(4);
      expect(pharmacy.drugs[0].benefit).toBe(23);
    });

    it("should drop benefit to 0 after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 0, 20)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(-1);
      expect(pharmacy.drugs[0].benefit).toBe(0);
    });

    it("should not exceed benefit of 50 before expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 5, 49)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].benefit).toBe(50); // 49 + 3 = 52, capped at 50
    });
  });
});
