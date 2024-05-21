"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import FormButton from "@/components/common/FormButton";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

import "@/styles/Freelance.css";
import CustomUpload from "../upload/CustomUpload";
import { typeOfContractOptions } from "@/lib/selectConstants";
import { useRouter } from "next/navigation";

interface Experience {
  id: any;
  jobTitle: string;
  company: string;
  typeOfContract: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
  formattedBeginningDate: string;
  formattedEndDate: string;
}

const CreateFreelanceExperienceForm = () => {

  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: uuidv4(),
      jobTitle: "",
      company: "",
      typeOfContract: "",
      beginningDate: dayjs("2022-04-17"),
      endDate: dayjs("2022-04-17"),
      formattedBeginningDate: "",
      formattedEndDate: "",
    },
  ]);

  const [downloadUrl, setDownloadUrl] = useState("");

  const sanitizeDates = () => {
    for (let experience of experiences) {
      experience.formattedBeginningDate = dayjs(
        experience.beginningDate
      ).format("DD-MM-YYYY");
      experience.formattedEndDate = dayjs(experience.endDate).format(
        "DD-MM-YYYY"
      );
    }
  };

  const addExperience = () => {
    console.log("down", downloadUrl);
    sanitizeDates();
    const newExperience = {
      id: uuidv4(),
      jobTitle: "",
      company: "",
      typeOfContract: "",
      beginningDate: dayjs("2022-04-17"),
      endDate: dayjs("2022-04-17"),
      formattedBeginningDate: "",
      formattedEndDate: "",
    };
    setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
  };

  const handleJobTitleChange = (index: number, value: string) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].jobTitle = value;
      return updatedExperiences;
    });
  };

  const handleCompanyChange = (index: number, value: string) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].company = value;
      return updatedExperiences;
    });
  };

  const handleSelectChange = (index: number, value: string) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].typeOfContract = value;
      return updatedExperiences;
    });
  };

  const handleBeginningDateChange = (index: number, value: Dayjs) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].beginningDate = value;
      return updatedExperiences;
    });
  };

  const handleEndDateChange = (index: number, value: Dayjs) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].endDate = value;
      return updatedExperiences;
    });
  };

  const handleDelete = (idToDelete: any) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((experience) => experience.id !== idToDelete)
    );
  };

  return (
    <div className="flex flex-col">
      {experiences.map((experience, index) => {
        return (
          <div key={experience.id}>
            <div className="flex mb-6 mt-6">
              <h5 className="text-bold text-2xl ">Expérience {index + 1}</h5>
              {index != 0 && (
                <span
                  className="text-bold text-2xl ml-5 cursor-pointer"
                  onClick={() => handleDelete(experience.id)}
                >
                  x
                </span>
              )}
            </div>

            <div className="flex justify-between w-10/12">
              <div className="flex flex-col w-5/12">
                <p className="mb-2">Intitulé du poste*</p>
                <TextInput
                  name="job"
                  placeholder="Intitulé du poste"
                  id="job"
                  type="text"
                  onChange={(e) => handleJobTitleChange(index, e.target.value)}
                  className="w-full rounded-2xl py-4"
                />
              </div>
              <div className="flex flex-col w-5/12">
                <p className="mb-2">Entreprise</p>
                <TextInput
                  name="job"
                  placeholder="Intitulé du poste"
                  id="job"
                  type="text"
                  onChange={(e) => handleCompanyChange(index, e.target.value)}
                  className="w-full rounded-2xl py-4"
                />
              </div>
            </div>

            <div className="flex justify-between w-10/12 mt-10">
              <div className="flex flex-col w-full">
                <p className="mb-2">Type de contrat</p>
                <div className="w-full picker-container rounded-full px-4 py-2 my-4">
                  <CustomSelect
                    value={experience.typeOfContract}
                    //@ts-ignore
                    setValue={(value: string) =>
                      handleSelectChange(index, value)
                    }
                    options={typeOfContractOptions}
                    label="Sélectionne le type de contrat"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between w-10/12 mt-10">
              <div className="flex flex-col w-5/12">
                <p className="mb-2">Date de début*</p>
                <div className="picker-container pl-4">
                  <CustomDatePicker
                    //@ts-ignore
                    value={experience.beginningDate}
                    //@ts-ignore
                    setValue={(newDate: Dayjs) =>
                      handleBeginningDateChange(index, newDate)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col w-5/12">
                <p className="mb-2">Date de fin*</p>
                <div className="picker-container pl-4">
                  <CustomDatePicker
                    //@ts-ignore
                    value={experience.endDate}
                    //@ts-ignore
                    setValue={(newDate: Dayjs) =>
                      handleEndDateChange(index, newDate)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div
        className="flex items-center justify-center mt-20 w-10/12 cursor-pointer"
        onClick={addExperience}
      >
        <span className="font-green text-4xl">+</span>
        <p>Ajoute une expérience</p>
      </div>

      <div className="flex justify-center items-center w-10/12 mt-6">
        <div className="w-3/12 lg:w-5/12">
          {!downloadUrl ? (
            <CustomUpload setDownloadUrl={setDownloadUrl} accept="application/pdf">
              <FormButton
                title="Télécharge ton CV ici"
                background="#B9D386"
                textClassName="text-black"
                className="w-3/12"
              />
            </CustomUpload>
          ) : (
            <div className="flex items-center justify-center mt-5 w-10/12 cursor-pointer mb-10">
              <p>CV uploadé !</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/12 self-end lg:w-4/12 mr-10">
        <FormButton
          title="OK"
          background="#B9D386"
          textClassName="text-black"
          handleButtonClick={() => router.push("/freelance/entreprise")}
        />
      </div>
    </div>
  );
};

export default CreateFreelanceExperienceForm;
