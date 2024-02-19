import React, { FC } from "react";
import Image from "next/image";

interface CardMissionProps {
  title: string;
  companyName: string;
  companyLogo: string;
  price: string;
  propositions: number;
  date: Date;
  time: string;
}

const CardMission: FC<CardMissionProps> = ({
  title,
  companyName,
  companyLogo,
  price,
  propositions,
  date,
  time,
}) => {
  return (
    <div className="flex card-mission-container p-4 my-10 w-full">
      <Image src={companyLogo} alt="logo" width={75} height={75} className="mr-7" />
      <div className="flex flex-col w-full">
        <h2 className="text-normal text-2xl">{title}</h2>
        <h5 className="text-light text-base">{companyName}</h5>
        <div className="flex justify-between w-full mt-2">
          <div className="flex w-3/12">
            <Image
              src="numberPropositions.svg"
              width={20}
              height={20}
              alt="Nombre de propositions"
            />
            <p className="ml-2 text-sm">{propositions} propositions</p>
          </div>
          <div className="flex w-3/12">
            <Image
              src="price.svg"
              width={15}
              height={15}
              alt="Prix d'une mission"
            />
            <p className="ml-2 text-sm">{price}</p>
          </div>
          <div className="flex w-3/12">
            <Image
              src="duration.svg"
              width={15}
              height={15}
              alt="Durée d'une mission"
            />
            <p className="ml-2 text-sm">{time}</p>
          </div>
          <div className="flex w-3/12">
            <Image
              src="calendar.svg"
              width={15}
              height={15}
              alt="Durée d'une mission"
            />
            <p className="ml-2 text-sm">{date.toLocaleDateString('fr-FR').replaceAll("/", ".")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMission;
