"use client";
import React, { useState } from "react";
import Image from "next/image";
import Mission from "@/entities/mission";
import CompetencesContainer from "@/components/common/CompetencesContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { deleteMission, getMissionById } from "@/http/mission";
import CustomDialog from "@/components/common/CustomDialog";
import Client from "@/entities/client";
import Loading from "@/app/loading";
import ReactDOM from "react-dom";
import FormButton from "@/components/common/FormButton";

interface DisplayMissionMobileProps {
  mission: Mission;
  user: Client;
  userType: string;
}

const DisplayMissionMobile: React.FC<DisplayMissionMobileProps> = ({
  mission,
  user,
  userType,
}) => {
  const router = useRouter();
  const [openThreeDotsMenu, setOpenThreeDotsMenu] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const missionDate = dayjs(mission.date).toDate();

  const handleDelete = async (id: string) => {
    await deleteMission(String(id));
    handleCloseDelete();
    router.push(`/client/ao`);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDuplicate = async (idAO: string) => {
    try {
      setLoading(true);
      setOpenThreeDotsMenu(false);
      const numericPart = parseInt(user.lastAOId.substring(2), 10);
      const nextNumericPart = numericPart + 1;
      const newAoId = `AO${nextNumericPart.toString().padStart(5, "0")}`;
      const client = new Client({
        ...user,
        lastAOId: newAoId,
      });
      await client.update();
      const mission: Mission = await getMissionById(idAO);
      const missionDuplicate = new Mission({
        acceptedFreelanceId: mission.acceptedFreelanceId,
        clientId: mission.clientId,
        title: mission.title,
        context: mission.context,
        goals: mission.goals,
        date: mission.date,
        price: mission.price,
        companyName: mission.companyName,
        length: mission.length,
        modalities: mission.modalities,
        competences: mission.competences,
        hiddenCompany: mission.hiddenCompany,
        hiddenMissionPlace: mission.hiddenMissionPlace,
        hiddenTJM: mission.hiddenTJM,
        aoId: newAoId,
        city: mission.city,
        status: mission.status,
        propositions: mission.propositions!,
        postalCode: mission.postalCode,
      });
      await missionDuplicate.save();
      setLoading(false);
      router.refresh();
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAnswer = () => {
    // @ts-ignore
    if (user.competences.length == 0) {
      setError(true);
    } else {
      router.push(`/freelance/ao/answer/${mission._id}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading />
        </div>
      )}
      <div className="flex flex-col w-full">
        <Link href={userType === "client" ? "/client/ao" : "/freelance"}>
          <h5 className="mb-10 xs:mt-10">&#60;- retour aux appels d&apos;offres</h5>
        </Link>
        <div className="flex flex-col">
          <div className="flex items-start mb-4 justify-between">
            <div className="flex">
              <Image
                src="/logoSoge.svg"
                width={100}
                height={100}
                alt="Logo société générale"
              />
              <div className="flex-col ml-10 sm:ml-0">
                <h4 className="text-normal text-xl sm:text-lg">{mission.title}</h4>
                <h5 className="text-light mb-3 text-lg">{mission.aoId}</h5>
              </div>
              {userType === "client" && (
                <div className="items-start flex ml-4">
                  <div className="flex">
                    <Image
                      src="/clientMissionModify.svg"
                      height={25}
                      width={25}
                      alt="modification"
                      className="img-modification justify-end"
                      onClick={() =>
                        router.push(`/client/ao/modify/${mission._id}`)
                      }
                    />
                    <Image
                      src="/corbeille.svg"
                      height={28}
                      width={28}
                      alt="modification"
                      className="img-modification justify-end mb-2"
                      onClick={() => setOpenDelete(true)}
                    />
                  </div>
                </div>
              )}
            </div>

            {userType === "client" && (
              <div className="flex flex-end items-start mt-2">
                <Image
                  src="/threeDot.svg"
                  height={20}
                  width={20}
                  alt="modification"
                  className="img-modification justify-end"
                  style={{ maxWidth: "20px", maxHeight: "20px" }}
                  onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                    setOpenThreeDotsMenu(!openThreeDotsMenu);
                    const rect = event.currentTarget.getBoundingClientRect();
                    setPopupPosition({
                      top: rect.bottom + window.scrollY,
                      left: rect.right + window.scrollX - 150,
                    });
                  }}
                />
              </div>
            )}

            {openThreeDotsMenu &&
              popupPosition &&
              ReactDOM.createPortal(
                <div
                  className="absolute bg-white rounded-md shadow-md p-3 popup-datagrid"
                  style={{
                    top: popupPosition.top,
                    left: popupPosition.left,
                    zIndex: 9000,
                  }}
                >
                  <p
                    className="profil-client-option cursor-pointer py-2 px-3 text-left font-medium"
                    onClick={() =>
                      router.push(`/client/ao/propositions/${mission._id}`)
                    }
                  >
                    Propositions
                  </p>
                  <p
                    className="profil-client-option cursor-pointer py-2 px-3 text-left font-medium"
                    onClick={() => handleDuplicate(String(mission._id))}
                  >
                    Dupliquer
                  </p>
                </div>,
                document.body
              )}
          </div>

          <div className="flex justify-between my-4">
            <div className="flex-col">
              <div className="flex my-2">
                <Image
                  src={
                    userType === "freelance"
                      ? "/freelanceMissionCalendar.svg"
                      : "/calendrier.svg"
                  }
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                {missionDate.toLocaleDateString("fr-FR").replaceAll("/", ".")}
              </div>
              <div className="flex my-2">
                <Image
                  src={
                    userType === "freelance"
                      ? "/freelanceMissionPrice.svg"
                      : "/tarifHT.svg"
                  }
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                <p className="mt-2">{mission.price} € HT/jour</p>
              </div>
            </div>

            <div className="flex-col">
              <div className="flex my-2">
                <Image
                  src={
                    userType === "freelance"
                      ? "/freelanceMissionTime.svg"
                      : "/dureeMission.svg"
                  }
                  height={25}
                  width={25}
                  alt="calendrier"
                  className="mr-4"
                />
                {mission.length}
              </div>

              {userType === "client" && (
                <div className="flex my-2">
                  <Image
                    src="/modaliteTravail.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
                  />
                  {mission.modalities}
                </div>
              )}

              {userType === "freelance" && (
                <div className="flex my-2">
                  <Image
                    src="/freelanceMissionPropositions.svg"
                    height={25}
                    width={25}
                    alt="calendrier"
                    className="mr-4"
                  />
                  <p className="mt-2">
                    {mission.propositions.length} propositions
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-4 rounded context-container w-full">
              <h5 className="text-normal">Contexte</h5>
              <p className="font-light text-sm"> {mission.context}</p>
            </div>

            <div className="p-4 rounded context-container">
              <h5 className="text-normal">Missions et livrables</h5>
              <p className="font-light text-sm"> {mission.goals}</p>
            </div>
          </div>

          <CompetencesContainer
            competences={mission.competences}
            freelance={userType === "freelance"}
          />

          {userType === "client" && (
            <div className="flex items-center justify-center">
              <button
                className="my-12 py-5 px-10 submit-button rounded-2xl bg-client 3md:px-6 3md:py-3"
                type="submit"
              >
                <span className="text-xl text-normal ml-2 mr-2 2lg:text-lg 3md:text-base">
                  Besoin d&apos;aide pour trouver la personne idéale ?
                </span>
              </button>
            </div>
          )}
        </div>
        <CustomDialog open={openDelete} onClose={handleCloseDelete}>
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="text-normal text-lg text-center mt-10">
                Es-tu sûr(e) de vouloir supprimer ton appel d&apos;offres ?
              </h2>
              <div className="flex my-10 ml-10">
                <div
                  className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center mr-4"
                  onClick={() => handleDelete(String(mission._id))}
                >
                  Oui
                </div>
                <div
                  className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center ml-4"
                  onClick={handleCloseDelete}
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

        {userType === "freelance" && (
          <div className=" flex items-center justify-center flex-col mb-20">
            <div className="w-5/12 mt-5 xs:w-full">
              <FormButton
                title="Répondre"
                background="#B9D38680"
                handleButtonClick={handleAnswer}
                textClassName="text-black text-semibold text-xl"
              />
            </div>
            {error && (
              <p className="error mt-5">
                Veuillez remplir d&apos;abord compléter{" "}
                <Link
                  href="/freelance/profil/competences"
                  className="font-semibold"
                >
                  votre profil
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayMissionMobile;
