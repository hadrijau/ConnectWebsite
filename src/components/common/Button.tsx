import Link from "next/link";
import React, { ReactNode, useState } from "react";
import "@/styles/components/Button.css";

interface ButtonProps {
  title: string;
  href: string;
  background: string;
  newBackground: string;
  borderColor: string;
  className: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  href,
  background,
  newBackground,
  borderColor,
  className,
  children,
  ...props
}) => {
  const [updatedBackground, setUpdatedBackground] = useState(background);

  return (
    <button
      className={`${className} text-white text-center py-4 custom-button`}
      onMouseEnter={() => setUpdatedBackground(newBackground)}
      onMouseLeave={() => setUpdatedBackground(background)}
      style={{
        background: updatedBackground,
        fontWeight: updatedBackground === "none" ? 500 : 700,
        borderWidth: 5,
        borderColor: borderColor
      }}
    >
      <Link href={href} className="text-xl">
        {children || title}
      </Link>
    </button>
  );
};

export default Button;
