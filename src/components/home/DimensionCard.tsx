import React from "react";
import "@/styles/components/DimensionCard.css";

interface DimensionCardProps {
  background: string;
  title: string;
  undertitle: string;
  text: string;

}

const DimensionCard: React.FC<DimensionCardProps> = ({ background, title, undertitle, text }) => {
  return (
    <div style={{ background }} className="p-6 dimension-card-container mx-2">
      <h1 className={text ? "text-5xl text-center text-white mt-6" : "text-5xl text-center text-white"}>{title}</h1>
      <h5 className="text-white text-center text-xl mt-2">{undertitle}</h5>
      {text && <p className="text-white text-sm text-center mt-2">{text}</p>}
    </div>
  );
};

export default DimensionCard;
