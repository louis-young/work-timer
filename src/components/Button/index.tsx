import classNames from "classnames";
import type { ButtonProps } from "./types";

export const Button = ({ text, type, onClick }: ButtonProps) => {
  const buttonClassNames = classNames({
    "px-8 py-4 rounded-sm text-sm font-medium transition-all": true,
    "text-gray-800 bg-gray-200 hover:bg-gray-400": type === "default",
    "text-white bg-green-400 hover:bg-green-600": type === "success",
    "text-white bg-indigo-500 hover:bg-indigo-700": type === "information",
    "text-white bg-red-400 hover:bg-red-600": type === "danger",
  });

  return (
    <button onClick={onClick} className={buttonClassNames}>
      {text}
    </button>
  );
};
