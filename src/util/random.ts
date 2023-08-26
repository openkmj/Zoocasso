const firstName = [
  "cuty",
  "kawai",
  "cool",
  "hot",
  "mutjin",
  "dangdanghan",
  "joyonghan",
];
const secondName = [
  "tokki",
  "yaongyi",
  "horangyi",
  "mungmungyi",
  "daramji",
  "sasum",
  "koggiri",
];

export const createRandomName = () => {
  return `${firstName[Math.floor(Math.random() * firstName.length)]} ${
    secondName[Math.floor(Math.random() * secondName.length)]
  }`;
};
