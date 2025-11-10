## Design Patterns Applied

### 1. Strategy Pattern

**Intent:** Define a family of algorithms, encapsulate each one, and make them interchangeable.

**Applied to:** Different drug update behaviors (Normal, HerbalTea, MagicPill, Fervex, Dafalgan)

**Benefits:**

- Open/Closed Principle
- Easy to add new behaviors
- Each strategy is independently testable

### 2. Factory Pattern

**Intent:** Create objects without specifying the exact class to create.

**Applied to:** StrategyFactory creates the appropriate strategy based on drug name

**Benefits:**

- Centralized object creation
- Easy to extend with new strategies
- Decouples pharmacy logic from strategy instantiation

### 3. Template Method Pattern

**Intent:** Define the skeleton of an algorithm, deferring some steps to subclasses.

**Applied to:** DrugStrategy.update() method defines the template (update expiration, then benefit)

**Benefits:**

- Consistent update flow across all strategies
- Subclasses only override what's different
- Common behavior is reused
