function SelectInput({ htmlName, title, value }: SelectInputProps) {
  return (
    <div className="flex flex-col">
      <label className="font-bold text-sm" htmlFor={htmlName}>
        {title} <span className="text-red-600">*</span>
      </label>
      <select name={htmlName} id={htmlName} value={value} disabled>
        <option>{value}</option>
      </select>
    </div>
  );
}

interface SelectInputProps {
  htmlName: string;
  title: string;
  value: string;
}

export default SelectInput;
