import React, { FC } from "react";

interface ButtonProps {
  text: string;
  handler: () => void;
}

export const Button: FC<ButtonProps> = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
      className="mx-2 px-2 py-1 border-solid border-2 border-gray-500 rounded hover:bg-gray-400 active:bg-gray-300"
    >
      {text}
    </button>
  );
};
