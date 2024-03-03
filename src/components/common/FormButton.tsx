import React, { ReactNode, CSSProperties } from "react";
import "@/styles/components/LongButton.css";

interface FormButtonProps {
  title: string;
  background?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  textClassName?: string;
  handleButtonClick?: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  className,
  style,
  textClassName,
  background,
  children,
  handleButtonClick,
  ...props
}) => {
  return (
    <button
      className={`${className} text-white text-center rounded-full py-3 w-full`}
      style={{ background, ...style }}
      onClick={handleButtonClick}
    >
      <p>{title}</p>
    </button>
  );
};

export default FormButton;
