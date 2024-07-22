export default function checkFormComplete(
  inputs: any,
  length: number
): boolean {
  const inputsArray = Object.values(inputs);
  if (inputsArray.length === length && !inputsArray.includes("")) {
    return true;
  } else {
    return false;
  }
}
