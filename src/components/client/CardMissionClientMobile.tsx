"use client";
import React, { FC } from "react";
import Image from "next/image";
import { ObjectId } from "mongodb";
import Link from "next/link";
import "@/styles/Client.css";
import CustomDialog from "@/components/common/CustomDialog";
import { deleteMission } from "@/http/mission";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

interface CardMissionMobileClientProps {
  _id: ObjectId;
  title: string;
  companyName: string;
  companyLogo: string;
  price: string;
  propositions: number;
  date: Dayjs;
  length: string;
  createdAt: Date;
}

const CardMissionMobileClient: FC<CardMissionMobileClientProps> = ({
  _id,
  title,
  companyName,
  companyLogo,
  price,
  propositions,
  date,
  createdAt,
  length,
}) => {
  const formattedDate = dayjs(date).format("DD.MM.YYYY");

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteMission(String(_id));
    handleClose();
    router.refresh();
  };

  return (
    <div className="flex items-center w-full">
      <Link href={`/client/ao/${_id}`} className="w-full">
        <div className="flex card-mission-container p-4 my-10 w-full relative sm:my-5">
          <div className="flex absolute top-2 right-3">
            <div className="flex items-center">
              <Image
                src="/clientHeart.svg"
                width={30}
                height={30}
                alt="publication AO"
              />

              <p className="text-normal text-xs ml-1">6</p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex mb-2">
              <Image
                src={companyLogo}
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
                    src="/clientMissionProposition.svg"
                    width={20}
                    height={20}
                    alt="Nombre de propositions"
                    color="black"
                    className="mr-2"
                  />
                  <p className="text-xs text-normal mt-1">
                    {propositions} propositions
                  </p>
                </div>
                <div className="flex w-5/12">
                  <Image
                    src="/clientMissionPrice.svg"
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
                    src="/clientMissionDuration.svg"
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
                    src="/clientMissionCalendar.svg"
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

      <CustomDialog open={open} onClose={handleClose}>
        <div className="flex">
          <div className="flex flex-col">
            <h2 className="text-normal text-xl mr-32 ml-10 mt-10">
              Es-tu sûr(e) de vouloir supprimer ton appel d&apos;offres ?
            </h2>
            <div className="flex my-10 ml-10">
              <div
                className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center mr-4"
                onClick={handleDelete}
              >
                Oui
              </div>
              <div
                className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center ml-4"
                onClick={handleClose}
              >
                Non
              </div>
            </div>
          </div>

          <Image
            src="/deleteAO.svg"
            width={200}
            height={200}
            alt="Supprimer AO"
          />
        </div>
      </CustomDialog>
    </div>
  );
};

export default CardMissionMobileClient;
