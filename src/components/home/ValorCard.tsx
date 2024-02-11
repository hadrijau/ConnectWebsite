import React, { ReactNode } from 'react';
import Image from 'next/image';
import "@/styles/components/ValorCard.css";

interface ValorCardProps {
  imageSrc: string;
  title: string;
  children?: ReactNode;
}

const ValorCard: React.FC<ValorCardProps> = ({ imageSrc, title, children }) => {
  return (
    <div className="flex flex-col items-center mx-3 py-10 valor-container px-5">
     
        <Image src={imageSrc} alt="" height={200} width={200}/>

   
      <h2 className="text-center font-bold text-4xl my-3">
        {title}
      </h2>
      <p className='text'>{children}</p>
    </div>
  );
};

export default ValorCard;
