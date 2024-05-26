import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelHtmlFor: string;
}

export function Input({ label = "", labelHtmlFor, ...rest }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={labelHtmlFor} className="text-xs text-gray-600 font-medium">
        {label}
      </label>
      <input
        {...rest}
        type="text"
        className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-full"
      />
    </div>
  );
}
