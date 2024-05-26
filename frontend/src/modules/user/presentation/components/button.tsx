import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function AddButton({label,...props}: ButtonProps) {
  return (
    <div className="flex justify-center w-full pt-8">
      <button
        {...props}
        type="submit"
        className="bg-blue-500 text-white rounded-md p-3 px-7 mt-7 hover:bg-blue-600 transition duration-200 ease-in-out text-lg"
      >
        Adicionar {label}
      </button>
    </div>
  );
}
