import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelHtmlFor: string;
  register: UseFormRegister<any>;
}

export function Input({
  label = "",
  labelHtmlFor,
  name,
  register,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={labelHtmlFor}
        className="text-xs text-gray-600 font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-full"
        {...rest}
        {...register(name || labelHtmlFor)}
      />
    </div>
  );
}
