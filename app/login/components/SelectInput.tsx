function SelectInput({
  name,
  options,
  value,
  handleInputs,
  state,
  loading,
  formIncomplete,
}: SelectInputProps) {
  return (
    <select
      value={value}
      id={name}
      name={name}
      onChange={handleInputs}
      disabled={loading}
      className={`w-full border p-2 md:p-4 text-sm md:text-base ${
        formIncomplete && !value && "border-red-600 bg-red-50"
      }`}
    >
      {state && <option hidden>Select state</option>}
      {options.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}

interface SelectInputProps {
  state?: boolean;
  name: string;
  value: string;
  handleInputs(e: any): void;
  options: string[];
  loading: boolean;
  formIncomplete: boolean;
}

export default SelectInput;
