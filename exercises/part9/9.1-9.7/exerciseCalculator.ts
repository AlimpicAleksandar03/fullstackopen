interface exerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface infoArguments {
  target: number;
  hours: Array<number>;
}

export const calculateExercises = (
  hours: Array<number>,
  target: number
): exerciseInfo => {
  if (!(hours && target)) {
    throw new Error("ARGS MISSING");
  }
  if (Array.isArray(hours) && target === Number(target)) {
    const filterZero = hours.filter((n) => n !== 0);
    const average = hours.reduce((a, b) => a + b) / hours.length;
    const difference = Math.abs(target - average);
    const rating = difference < 1 ? 3 : difference < 2 ? 2 : 1;
    return {
      periodLength: hours.length,
      trainingDays: filterZero.length,
      success: target === average,
      rating,
      ratingDescription:
        rating === 3
          ? "very good"
          : rating === 2
          ? "not too bad"
          : "bad rating",
      target,
      average,
    };
  } else {
    throw new TypeError("invalid typeof args");
  }
};

const parseArguments = (args: Array<string>): infoArguments => {
  const validArgs = args.map(Number).filter((n) => !isNaN(n));
  const [target, ...hours] = validArgs;
  return {
    target,
    hours,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log(`Something went wrong: ${e}`);
}
