import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  formatCurrency,
  validateInputs,
} from "./calculations";

describe("Calculation Utilities", () => {
  describe("calculateSimpleInterest", () => {
    test("calculates simple interest correctly", () => {
      const result = calculateSimpleInterest(10000, 2, 12);
      expect(result).toBe(12400); // 10000 * (1 + 0.02 * 12)
    });

    test("throws error for invalid inputs", () => {
      expect(() => calculateSimpleInterest(-1000, 2, 12)).toThrow();
      expect(() => calculateSimpleInterest(10000, -2, 12)).toThrow();
      expect(() => calculateSimpleInterest(10000, 2, -12)).toThrow();
    });
  });

  describe("calculateCompoundInterest", () => {
    test("calculates monthly compound interest correctly", () => {
      const result = calculateCompoundInterest(10000, 2, 12, "monthly");
      expect(result).toBeCloseTo(12682.42, 2); // Compound interest formula
    });

    test("calculates yearly compound interest correctly", () => {
      const result = calculateCompoundInterest(10000, 2, 12, "yearly");
      expect(result).toBeCloseTo(12400, 2); // Should be close to simple interest for 1 year
    });

    test("throws error for invalid inputs", () => {
      expect(() =>
        calculateCompoundInterest(-1000, 2, 12, "monthly")
      ).toThrow();
      expect(() =>
        calculateCompoundInterest(10000, -2, 12, "monthly")
      ).toThrow();
      expect(() =>
        calculateCompoundInterest(10000, 2, -12, "monthly")
      ).toThrow();
    });
  });

  describe("formatCurrency", () => {
    test("formats currency correctly", () => {
      expect(formatCurrency(12345.67)).toBe("₹12,345.67");
      expect(formatCurrency(1000)).toBe("₹1,000.00");
    });
  });

  describe("validateInputs", () => {
    test("returns valid for correct inputs", () => {
      const result = validateInputs(10000, 2, 12);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("returns invalid for incorrect inputs", () => {
      const result = validateInputs(-1000, 150, 1500);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
