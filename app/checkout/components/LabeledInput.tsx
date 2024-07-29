function LabeledInput({
  type,
  title,
  htmlName,
  value,
}: LabeledInputProps) {
  return (
    <div className="flex-1 flex flex-col">
      <label htmlFor={htmlName} className="font-bold text-sm">
        {title}
        <span className="text-red-700">*</span>
      </label>
      <input
        type={type}
        id={htmlName}
        name={htmlName}
        value={value}
        disabled
      />
    </div>
  );
}

interface LabeledInputProps {
  type: string;
  title: string;
  htmlName: string;
  value: string;
}

export default LabeledInput;
