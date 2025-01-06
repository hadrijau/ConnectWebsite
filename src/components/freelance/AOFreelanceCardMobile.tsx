import React from "react";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";

interface AOFreelanceMobileProps {
  title: string;
  companyName: string;
  companyLogo: string;
  clientProposedPrice: string;
  city: string;
  modalities: string;
  date: Dayjs;
  length: string;
}

const AOFreelanceCardMobile: React.FC<AOFreelanceMobileProps> = ({
  title,
  companyName,
  companyLogo,
  clientProposedPrice,
  date,
  city,
  modalities,
  length,
}) => {
  const formattedDate = dayjs(date).format("DD.MM.YYYY");

  return (
    <div className="flex flex-col card-mission-container my-10 w-full p-5">
      <div className="flex">
        <Image
          src={companyLogo}
          alt="logo"
          width={75}
          height={75}
          className="mr-7"
        />
        <div className="flex flex-col w-8/12 3md:w-full">
          <h2 className="text-normal text-2xl sm:text-lg">{title}</h2>
          <h5 className="text-light text-base">{companyName}</h5>
        </div>
      </div>

      <div className="flex justify-end">
        <Image
          src="/ImageMap.svg"
          height={20}
          width={20}
          alt="calendrier"
          className="mr-4"
        />
        <p className="sm:text-sm">{city}</p>
      </div>

      <div className="flex mt-5">
        <div className="flex-col mt-2">
          <div className="flex mr-20">
            <Image
              src="/calendar.svg"
              width={20}
              height={20}
              color="black"
              alt="Durée d'une mission"
            />
            <p className="ml-2 text-sm text-normal lg:text-xs">
              {formattedDate}
            </p>
          </div>
          <div className="flex mt-5">
            <Image
              src="/duration.svg"
              width={20}
              height={20}
              alt="Durée d'une mission"
            />
            <p className="ml-2 text-sm text-normal lg:text-xs">
              {length.toString()}
            </p>
          </div>
        </div>
        <div className=" flex-col mt-2">
          <div className="flex">
            <Image
              src="/price.svg"
              width={20}
              height={20}
              alt="Prix d'une mission"
            />
            <p className="ml-2 text-sm text-normal lg:text-xs">
              Tarif demandé: {clientProposedPrice} € HT/jour
            </p>
          </div>

          <div className="flex mt-3">
            <Image
              src="/modalitiesFreelance.svg"
              height={20}
              width={20}
              alt="calendrier"
            />
            <p className="ml-2 text-sm text-normal lg:text-xs">{modalities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AOFreelanceCardMobile;
