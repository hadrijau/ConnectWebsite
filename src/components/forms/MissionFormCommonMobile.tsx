import React from "react";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import CustomSelect from "@/components/common/CustomSelect";
import { Field, ErrorMessage } from "formik";
import CustomDateField from "@/components/common/CustomDateField";
import { Dayjs } from "dayjs";
import { lengthOptions, modalitiesOptions } from "@/lib/selectConstants";
import CompetencesSelection from "@/components/forms/CompetencesSelection";
import { CircularProgress } from "@mui/material";

interface MissionFormCommonMobileProps {
  touched: any;
  errors: any;
  handleChange: any;
  values: any;
  handleBlur: any;
  lastAOId: string;
  hiddenCompany: boolean;
  city: string;
  postalCode: string;
  setHiddenCompany: (hiddenCompany: boolean) => void;
  hiddenTJM: boolean;
  setHiddenTJM: (hiddenTJM: boolean) => void;
  hiddenMissionPlace: boolean;
  setHiddenMissionPlace: (hiddenMissionPlace: boolean) => void;
  setFieldValue: (field: string, value: any) => void;
  selectedCompetences: { label: string; level: number }[];
  setSelectedCompetences: (
    competences: { label: string; level: number }[]
  ) => void;
  addCompetence: () => void;
  formError: string;
  loading: boolean;
  textSubmit: string;
}

const MissionFormCommonMobile: React.FC<MissionFormCommonMobileProps> = ({
  touched,
  errors,
  handleChange,
  lastAOId,
  city,
  postalCode,
  hiddenCompany,
  setHiddenCompany,
  hiddenMissionPlace,
  setHiddenMissionPlace,
  hiddenTJM,
  setHiddenTJM,
  values,
  handleBlur,
  setFieldValue,
  selectedCompetences,
  setSelectedCompetences,
  addCompetence,
  formError,
  loading,
  textSubmit,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        <h5 className="text-light mb-3">{lastAOId}</h5>
        <div className="my-5">
          <TextInput
            name="title"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            placeholder="Titre de la mission*"
          />
        </div>

        <div className="flex my-2 justify-end">
          <Image
            src="/ImageMap.svg"
            height={25}
            width={25}
            alt="calendrier"
            className="mr-4"
          />
          <p className="mt-1">
            {city}, {postalCode}
          </p>
        </div>

        <div className="flex justify-between">
          <div className="flex-col w-5/12 sm:w-60 mx-2">
            <div className="flex my-4">
              <Image
                src="/calendrier.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <div className="w-6/12 lg:w-11/12">
                <Field
                  name="date"
                  component={CustomDateField}
                  value={values.date}
                  onChange={(value: Dayjs | null) =>
                    setFieldValue("date", value)
                  }
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  placeholder="Sélectionner une date*"
                />
              </div>
            </div>
            <div className="flex my-4">
              <Image
                src="/tarifHT.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <div className="w-5/12">
                <TextInput
                  name="price"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  placeholder="Tarif*"
                />
              </div>
              <p className="mt-4 ml-4 md:text-sm">€ HT/jour</p>
            </div>
          </div>

          <div className="flex-col w-5/12 sm:w-60 mx-2">
            <div className="flex my-4">
              <Image
                src="/dureeMission.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <CustomSelect
                name="length"
                value={values.length}
                onChange={(e) => setFieldValue("length", e.target.value)}
                onBlur={handleBlur}
                options={lengthOptions}
                placeholder="Durée de la mission*"
                className="w-4/12 lg:w-11/12"
              />
            </div>
            <div className="flex my-4">
              <Image
                src="/modaliteTravail.svg"
                height={25}
                width={25}
                alt="calendrier"
                className="mr-4"
              />
              <CustomSelect
                name="modalities"
                value={values.modalities}
                onChange={(e) => setFieldValue("modalities", e.target.value)}
                onBlur={handleBlur}
                options={modalitiesOptions}
                placeholder="Modalitiés de la mission*"
                className="w-4/12 lg:w-11/12"
              />
              <ErrorMessage
                name="sector"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="my-5">
          <TextInput
            name="context"
            type="text"
            multiline
            rows={13}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.context}
            error={touched.context && Boolean(errors.context)}
            helperText={touched.context && errors.context}
            placeholder="Contexte *"
          />
        </div>
        <div className="my-5">
          <TextInput
            name="goals"
            type="text"
            multiline
            rows={13}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.goals}
            error={touched.goals && Boolean(errors.goals)}
            helperText={touched.goals && errors.goals}
            placeholder="Missions et livrables *"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex my-2 competences-container rounded-2xl p-6 flex-col">
            <p className=" text-xl text-normal 3md:text-lg">
              Compétences requises <span className="color-red">*</span>
            </p>

            <div className="flex mt-5 mb-5 justify-between">
              <p className="w-6/12 text-center 2lg:w-8/12">Compétences</p>
              <p className="w-5/12 text-center 2lg:w-3/12">Niveau</p>
            </div>

            <CompetencesSelection
              competences={selectedCompetences}
              setCompetences={setSelectedCompetences}
              addCompetence={addCompetence}
            />
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <div
            className={`rounded-2xl cursor-pointer p-2 mx-2 ${
              !hiddenCompany ? `hide-button` : "hide-button-focus"
            }`}
            onClick={() => setHiddenCompany(!hiddenCompany)}
          >
            <h5 className="text-normal text-center 3md:text-sm">
              Je cache le nom de la société
            </h5>
          </div>
          <div
            className={`rounded-2xl cursor-pointer p-2 mx-2 ${
              !hiddenTJM ? `hide-button` : "hide-button-focus"
            }`}
            onClick={() => setHiddenTJM(!hiddenTJM)}
          >
            <h5 className="text-normal text-center 3md:text-sm">
              Je cache le TJM demandé
            </h5>
          </div>
          <div
            className={`rounded-2xl cursor-pointer p-2 mx-2 ${
              !hiddenMissionPlace ? `hide-button` : "hide-button-focus"
            }`}
            onClick={() => setHiddenMissionPlace(!hiddenMissionPlace)}
          >
            <h5 className="text-normal text-center 3md:text-sm">
              Je cache le lieu de la mission
            </h5>
          </div>
        </div>
      </div>
      {formError && <p className="error text-xs">{formError}</p>}
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <button
          className="my-12 py-5 px-10 submit-button rounded-2xl bg-client"
          type="submit"
        >
          <span className="text-xl text-semibold ml-2 mr-2">{textSubmit}</span>
        </button>
      )}
    </div>
  );
};

export default MissionFormCommonMobile;
