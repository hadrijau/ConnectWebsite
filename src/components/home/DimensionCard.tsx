import React from "react";
import "@/styles/components/DimensionCard.css";

interface DimensionCardProps {
  background: string;
  title: string;
  undertitle: string;
  text: string;
  className?: string;
}

const DimensionCard: React.FC<DimensionCardProps> = ({
  background,
  title,
  undertitle,
  text,
  className,
}) => {
  return (
    <div
      style={{ background }}
      className={`p-6 dimension-card-container mx-2 ${className} sm:p-2`}
    >
      <h1
        className={
          text
            ? "text-5xl text-center text-white mt-6 sm:text-2xl"
            : "text-5xl text-center text-white sm:text-2xl"
        }
      >
        {title}
      </h1>
      <h5 className="text-white text-center text-xl mt-2 sm:text-sm">{undertitle}</h5>
      {text && <p className="text-white text-sm text-center mt-2 sm:text-sm">{text}</p>}
    </div>
  );
};

export default DimensionCard;
