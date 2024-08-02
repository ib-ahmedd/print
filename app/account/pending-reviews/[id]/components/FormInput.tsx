function FormInput({
  type,
  placeholder,
  value,
  name,
  handleChange,
  disabled,
  max,
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      disabled={disabled}
      onChange={handleChange}
      maxLength={max}
      className="w-[48%] border text-sm md:text-base py-1 sm:py-3 px-2"
    />
  );
}

interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  disabled?: boolean;
  handleChange(e: any): void;
  max?: number;
}
export default FormInput;
