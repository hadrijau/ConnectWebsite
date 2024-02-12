import Link from 'next/link';
import React, { ReactNode, CSSProperties } from 'react';
import "@/styles/components/LongButton.css";

interface LongButtonProps {
  title: string;
  href: string;
  background?: string;
  children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    textClassName: string;
}

const LongButton: React.FC<LongButtonProps> = ({ title, href, className, style, textClassName, background, children, ...props }) => {
  return (
    <button className={`${className} text-white text-center rounded-full py-3 w-full`} style={{ background, ...style }}>
      <Link href={href} className={`${textClassName}`}> 
        {title ? <p>{title}</p>: <>Télécharger <span className='font-bold'>Connect</span></>}
      </Link>
    </button>
  );
};

export default LongButton;
