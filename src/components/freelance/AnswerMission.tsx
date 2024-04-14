"use client";
import React, { useState } from "react";
import Image from "next/image";
import FormButton from "@/components/common/FormButton";
import CustomDatePicker from "../common/CustomDatePicker";
import dayjs from "dayjs";
import TextInput from "@/components/common/TextInput";
import CustomUpload from "@/components/upload/CustomUpload";
import "@/styles/Freelance.css";
import { Mission } from "@/entities/mission";

interface AnswerMissionProps {
  mission: Mission
}

const AnswerMission:React.FC<AnswerMissionProps> = ({ mission }) => {
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [downloadUrl, setDownloadUrl] = useState("");

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <div className="flex-col w-7/12">
            <div className="flex items-center mb-4">
              <Image
                src="/logoSoge.svg"
                width={150}
                height={150}
                alt="Logo société générale"
              />
              <div className="flex-col ml-10">
                <h4 className="text-normal text-2xl">{mission.title}</h4>
                <h5 className="text-light mb-3 text-xl">AO 00002</h5>
              </div>
            </div>

            <div className="flex flex-col mt-16">
              <h5 className="why-me-text text-2xl mb-5">
                Pourquoi toi et pas un autre ?
              </h5>
              <textarea
                name=""
                id=""
                placeholder="Quelles sont tes forces ? Quelles sont tes expériences significatives pouvant faire pencher la balance ?"
              ></textarea>
              <div className="rounded ">
                <h5 className="text-xl">
                  Disponilbités{" "}
                  <span style={{ color: "#B9D386", fontWeight: "bold" }}>
                    *
                  </span>
                </h5>
                <div className="picker-container w-3/12 my-5 px-2">

                  <CustomDatePicker setValue={setDate} value={date} />
                </div>
              </div>

              <h5 className="text-xl">
                Montant que je souhaite percevoir (HT){" "}
                <span style={{ color: "#B9D386", fontWeight: "bold" }}>*</span>
              </h5>
              <div className="flex items-center my-5">
                <TextInput
                  name="price"
                  id="price"
                  placeholder=""
                  type="number"
                  className="rounded-2xl mr-5"
                />
                <h5>€ par jour</h5>
              </div>
              <div className="w-5/12">
                {!downloadUrl ? (
                  <CustomUpload setDownloadUrl={setDownloadUrl}>
                    <FormButton
                      title="J'ajoute mon CV"
                      background="#B9D386"
                      textClassName="text-black"
                      className="w-3/12"
                    />
                  </CustomUpload>
                ) : (
                  <h5>Ton CV a été soumis !</h5>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-4/12">
            <div className="flex my-2">
              <Image
                src="/freelanceMissionCalendar.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {new Date(mission.date)
                .toLocaleDateString("fr-FR")
                .replaceAll("/", ".")}
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionPrice.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <p className="mt-2">{mission.price} € HT/jour</p>
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionTime.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              {mission.length}
            </div>
            <div className="flex my-2">
              <Image
                src="/freelanceMissionPropositions.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-10 items-center">
        <Image
          src="/freelanceSendMission.svg"
          height={150}
          width={150}
          alt="calendrier"
          className="mr-4"
        />
        <FormButton
          title="Envoyer"
          background="#B9D386"
          textClassName="text-black"
          className="w-52 h-12"
        />
      </div>
    </div>
  );
};

export default AnswerMission;
