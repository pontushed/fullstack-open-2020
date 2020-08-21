interface BmiValues {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) * (height / 100));

  if (result < 15) {
    return 'Very severely underweight';
  }
  if (result < 16) {
    return 'Severely underweight';
  }
  if (result < 18.5) {
    return 'Underweight';
  }
  if (result < 25) {
    return 'Normal (healthy weight)';
  }
  if (result < 30) {
    return 'Overweight';
  }
  if (result < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  if (result < 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }

  return 'null';
};

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provides arguments are not numbers');
  }
  return { height: Number(args[2]), weight: Number(args[3]) };
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error happened!, message: ', e.message);
}

export { calculateBmi };
