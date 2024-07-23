function FormInput({
  loading,
  type,
  name,
  value,
  placeholder,
  handleInputs,
  formIncomplete,
  passwordsMatch,
  loginDetailsError,
}: FormInputProps) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      disabled={loading}
      onChange={handleInputs}
      className={`w-full border p-3 md:p-4 focus:outline-none focus:border-dashed text-sm md:text-base ${
        (formIncomplete && !value) ||
        (passwordsMatch === false && type === "password")
          ? "border-red-600 bg-red-50"
          : ""
      } ${loginDetailsError && "border-red-600 bg-red-50"}`}
    />
  );
}

interface FormInputProps {
  loading?: boolean;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  formIncomplete?: boolean;
  handleInputs(e: any): void;
  passwordsMatch?: boolean;
  loginDetailsError?: boolean;
}

export default FormInput;
