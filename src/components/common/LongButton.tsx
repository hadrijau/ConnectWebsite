import Link from "next/link";
import React, { ReactNode, CSSProperties } from "react";
import "@/styles/components/LongButton.css";

interface LongButtonProps {
  title: string;
  href: string;
  background?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  textClassName?: string;
  handleButtonClick?: () => void;
}

const LongButton: React.FC<LongButtonProps> = ({
  title,
  href,
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
      className={`${className} text-white text-center rounded-full py-3 px-8`}
      style={{ background, ...style }}
      onClick={handleButtonClick}
    >
      <Link href={href} className={`${textClassName}`}>
        {title ? (
          <p >{title}</p>
        ) : (
          <>
            Télécharger <span className="font-bold">Connect</span>
          </>
        )}
      </Link>
    </button>
  );
};

export default LongButton;
