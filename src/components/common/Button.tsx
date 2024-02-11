import Link from 'next/link';
import React, { ReactNode } from 'react';
import "@/styles/components/Button.css";

interface ButtonProps {
  title: string;
  href: string;
  className: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, href, className, children, ...props }) => {
  return (
    <button className={`${className} text-white text-center py-4 custom-button`}>
      <Link href={href} className='text-xl'> 
        {children || title}
      </Link>
    </button>
  );
};

export default Button;
