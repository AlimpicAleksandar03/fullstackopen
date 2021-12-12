export const calculateBmi = (height: number, weight: number): string => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    if (height === 0) {
      throw new Error("cant divide by zero");
    }
    const result = (weight / Math.pow(height, 2)) * 10000;

    if (result < 18.5) {
      return "Underweight (Possible nutritional deficiency and osteoporosis)";
    }
    if (result >= 18.5 && result <= 22.9) {
      return "Normal (Low risk (healthy range)";
    }
    if (result >= 23 && result <= 27.4) {
      return "Mild to moderate overweight (Moderate risk of developing heart disease, high blood pressure, stroke, diabetes mellitus)";
    }
    if (result >= 27.5) {
      return "Very overweight to obsese (High risk of developing heart disease, high blood pressure, stroke, diabetes mellitus. Metabolic Syndrome)";
    }
    return "";
  } else {
    throw new TypeError("Invalid typeof arguments, need number");
  }
};
