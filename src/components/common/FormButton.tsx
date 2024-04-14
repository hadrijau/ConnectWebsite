import React, { ReactNode, CSSProperties, ButtonHTMLAttributes, MouseEventHandler } from "react";
import "@/styles/components/LongButton.css";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLDivElement>{
  title: string;
  background?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  handleButtonClick?: MouseEventHandler<HTMLDivElement>;
  textClassName?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  className,
  style,
  textClassName,
  background,
  children,
  handleButtonClick,
  ...rest
}) => {
  return (
    <div
      {...rest}
      onClick={handleButtonClick}
      className={`${className} text-white text-center rounded-2xl py-3 w-full cursor-pointer`}
      style={{ background, ...style }}
    >
      <p className={textClassName}>{title}</p>
    </div>
  );
};

export default FormButton;
