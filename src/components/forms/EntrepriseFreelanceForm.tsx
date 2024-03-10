"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import FormButton from "@/components/common/FormButton";
import CustomSelect from "@/components/common/CustomSelect";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

import "@/styles/Freelance.css";
import CustomUpload from "../upload/CustomUpload";

interface Experience {
  typeOfContract: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
  formattedBeginningDate: string;
  formattedEndDate: string;
}

const EntrepriseFreelanceForm = () => {
  const [experience, setExperience] = useState<Experience>({
    typeOfContract: "",
    beginningDate: dayjs("2022-04-17"),
    endDate: dayjs("2022-04-17"),
    formattedBeginningDate: "",
    formattedEndDate: "",
  });

  const sanitizeDates = () => {
    experience.formattedBeginningDate = dayjs(experience.beginningDate).format(
      "DD-MM-YYYY"
    );
    experience.formattedEndDate = dayjs(experience.endDate).format(
      "DD-MM-YYYY"
    );
  };

  

  const handleJobTitleChange = (value: string) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      jobTitle: value,
    }));
  };
  
  const handleBeginningDateChange = (value: Dayjs) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      beginningDate: value,
    }));
  };

  const handleEndDateChange = (value: Dayjs) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      endDate: value,
    }));
  };

  return (
    <div>
      <div>
        <div className="flex mb-6 mt-6">
        </div>

        <div className="flex justify-between w-10/12 mt-10">
          <div className="flex flex-col w-full">
            <p className="mb-2">Type de contrat</p>
            <div className="w-full picker-container rounded-full px-4 py-2 my-4">
              <CustomSelect
                value={experience.typeOfContract}
                setValue={(value: string) => handleJobTitleChange(value)}
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
                value={experience.beginningDate}
                setValue={(newDate: Dayjs) =>
                  handleBeginningDateChange(newDate)
                }
              />
            </div>
          </div>

          <div className="flex flex-col w-5/12">
            <p className="mb-2">Date de fin*</p>
            <div className="picker-container pl-4">
              <CustomDatePicker
                value={experience.endDate}
                setValue={(newDate: Dayjs) =>
                  handleEndDateChange(newDate)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-10/12 mt-6">
      <div className="w-6/12 ml-20 mt-40 mb-10">
          <FormButton
            title="Sauvegarder"
            background="#B9D386"
            textClassName="text-black"
            className="w-3/12"
          />
        </div>
      </div>

      <Link href="#" className="mt-20">Je passe cette étape</Link>
    </div>
  );
};

export default EntrepriseFreelanceForm;
