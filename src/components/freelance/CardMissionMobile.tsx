"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Mission from "@/entities/mission";
import Freelance from "@/entities/freelance";
import { useRouter } from "next/navigation";

interface CardMissionMobileProps {
  mission: Mission;
  freelance: Freelance;
}

const CardMissionMobile: FC<CardMissionMobileProps> = ({
  mission: { _id, title, companyName, propositions, price, length, date, createdAt },
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
  };

  const timeDifference = new Date().getTime() - new Date(createdAt).getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return (
    <Link href={`/freelance/ao/${_id}`} className="w-full">
      <div className="flex card-mission-container p-4 my-10 w-full relative sm:my-5">
        <div className="flex absolute top-2 right-3">
          <div className="flex items-center">
            <Image
              src="/likeMissionFreelance.svg"
              width={30}
              height={30}
              alt="publication AO"
              onClick={handleAddLikeMission}
            />

            <p className="text-normal text-xs ml-1">6</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex mb-2">
            <Image
              src={"/logoSoge.svg"}
              alt="logo"
              width={75}
              height={75}
              className="mr-10"
            />
            <div className="flex-col">
              <h2 className="text-normal text-2xl lg:text-xl">{title}</h2>
              <h5 className="text-light text-base">{companyName}</h5>
            </div>
          </div>

          <div className="flex flex-col w-full mt-2">
            <div className="flex justify-between">
              <div className="flex w-5/12 items-center">
                <Image
                  src="/numberPropositions.svg"
                  width={20}
                  height={20}
                  alt="Nombre de propositions"
                  color="black"
                  className="mr-2"
                />
                <p className="text-xs text-normal mt-1">
                  {propositions.length} propositions
                </p>
              </div>
              <div className="flex w-5/12">
                <Image
                  src="/price.svg"
                  width={15}
                  height={15}
                  alt="Prix d'une mission"
                  className="mr-2"
                />
                <p className="text-normal text-xs">{price} € HT/jour</p>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="flex w-5/12">
                <Image
                  src="/duration.svg"
                  width={15}
                  height={15}
                  alt="Durée d'une mission"
                  className="mr-2"
                />
                <p className="text-sm text-normal lg:text-xs">
                  {length.toString()}
                </p>
              </div>
              <div className="flex w-5/12">
                <Image
                  src="/calendar.svg"
                  width={15}
                  height={15}
                  color="black"
                  alt="Durée d'une mission"
                  className="mr-2"
                />
                <p className="text-sm text-normal lg:ml-1 lg:text-xs">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <p className="text-normal text-xs ml-2 mr-4">
              Publiée il y a {daysDifference} jours
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMissionMobile;
