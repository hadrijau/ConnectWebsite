import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ObjectId } from "mongodb";
interface CardMissionProps {
  _id: ObjectId;
  title: string;
  companyName: string;
  companyLogo: string;
  price: number;
  propositions: number;
  date: Date;
  length: string;
}

const CardMission: FC<CardMissionProps> = ({
  _id,
  title,
  companyName,
  companyLogo,
  price,
  propositions,
  date,
  length,
}) => {
  const formattedDate =
    typeof date === "string"
      ? new Date(date).toLocaleDateString("fr-FR").replaceAll("/", ".")
      : date.toLocaleDateString("fr-FR").replaceAll("/", ".");

  return (
    <Link href={`/freelance/ao/${_id}`}>
      <div className="flex card-mission-container p-4 my-10 w-full">
        <Image
          src={companyLogo}
          alt="logo"
          width={75}
          height={75}
          className="mr-7"
        />
        <div className="flex flex-col w-full">
          <h2 className="text-normal text-2xl">{title}</h2>
          <h5 className="text-light text-base">{companyName}</h5>
          <div className="flex justify-between w-full mt-2">
            <div className="flex w-3/12">
              <Image
                src="/numberPropositions.svg"
                width={20}
                height={20}
                alt="Nombre de propositions"
                color="black"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{propositions} propositions</p>
            </div>
            <div className="flex w-3/12">
              <Image
                src="/price.svg"
                width={15}
                height={15}
                alt="Prix d'une mission"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{price} € HT/jour</p>
            </div>
            <div className="flex w-3/12">
              <Image
                src="/duration.svg"
                width={15}
                height={15}
                alt="Durée d'une mission"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{length.toString()}</p>
            </div>
            <div className="flex w-3/12">
              <Image
                src="/calendar.svg"
                width={15}
                height={15}
                color="black"
                alt="Durée d'une mission"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMission;
