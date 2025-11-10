import { StrategyFactory } from "./strategies/StrategyFactory.js";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const strategy = StrategyFactory.create(drug.name);
      strategy.update(drug);
    });

    return this.drugs;
  }
}
