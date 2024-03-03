import React, { ReactNode } from "react";
import "@/styles/components/TextInput.css";
interface TextInputProps {
  label?: string;
  name: string;
  id: string;
  textarea?: boolean;
  className?: string;
  placeholder: string;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  id,
  type,
  placeholder,
  className,
  textarea,
  ...props
}) => {
  return (
    <div className={`${className} input-container p-3`}>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          id={id}
          className={`w-full bg-inherit border-none outline-none`}
        />
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          {...props}
          className={`w-full bg-inherit border-none outline-none`}
        />
      )}
    </div>
  );
};

export default TextInput;
