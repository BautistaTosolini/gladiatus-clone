export function randomBoolean(probability: number) {
  return Math.random() * 100 <= probability;
}

export function chooseRandomOption(option1: any, option2: any) {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return option1;
  } else {
    return option2;
  }
}

export function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}