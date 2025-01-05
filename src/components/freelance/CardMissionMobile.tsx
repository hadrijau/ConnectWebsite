"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Mission from "@/entities/mission";
import Freelance from "@/entities/freelance";
import { useRouter } from "next/navigation";

interface CardMissionMobileProps {
  mission: Mission,
  freelance: Freelance
}

const CardMissionMobile: FC<CardMissionMobileProps> = ({
  mission: {
    _id,
    title,
    companyName,
    propositions,
    price,
    length,
    date,
  },
  freelance,
}) => {
  const formattedDate = dayjs(date).format("DD.MM.YYYY");

  const router = useRouter();
  const handleAddLikeMission = async () => {
    const updatedFreelance = new Freelance({
      ...freelance,
      missionsLiked: [...freelance.missionsLiked, _id!],
    });
    updatedFreelance.update();
    router.push("/freelance/ao/cheris");
  }

  return (
    <Link href={`/freelance/ao/${_id}`}>
      <div className="flex card-mission-container p-4 my-10 w-full relative sm:my-5">
        <Image
          src={"/logoSoge.svg"}
          alt="logo"
          width={75}
          height={75}
          className="mr-7"
        />
        <div className="absolute top-0 right-0 mt-4 mr-7">
          <Image
            src="/likeMissionFreelance.svg"
            alt="Like Mission"
            width={20}
            height={20}
            onClick={handleAddLikeMission}
          />
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-normal text-2xl lg:text-xl">{title}</h2>
          <h5 className="text-light text-base">{companyName}</h5>
          <div className="flex justify-between w-full mt-2">
            <div className="flex w-5/12">
              <Image
                src="/numberPropositions.svg"
                width={20}
                height={20}
                alt="Nombre de propositions"
                color="black"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{propositions.length} propositions</p>
            </div>
            <div className="flex w-5/12">
              <Image
                src="/price.svg"
                width={15}
                height={15}
                alt="Prix d'une mission"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{price} € HT/jour</p>
            </div>
            <div className="flex w-5/12">
              <Image
                src="/duration.svg"
                width={15}
                height={15}
                alt="Durée d'une mission"
              />
              <p className="ml-2 text-sm text-normal lg:text-xs">{length.toString()}</p>
            </div>
            <div className="flex w-5/12">
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

export default CardMissionMobile;