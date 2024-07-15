export default function checkFormComplete(inputs: InputType): boolean {
  const inputsArray = Object.values(inputs);
  if (inputsArray.length === 3 && !inputsArray.includes("")) {
    return true;
  } else {
    return false;
  }
}

interface InputType {
  email: string;
  subject: string;
  message: string;
}
