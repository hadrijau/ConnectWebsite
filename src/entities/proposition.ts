import { ObjectId } from "mongodb";
import dayjs, { Dayjs } from "dayjs";
import { Enterprise } from "./freelance";

export enum ClientStatus {
  UNOPENED = "Non ouvert",
  OPENED = "Ouvert",
}

export enum FreelanceStatus {
  ONGOING = "En cours",
  WON = "Gagné",
  LOST = "Perdu",
}

interface PropositionProps {
  _id?: ObjectId;
  missionId: string;
  title: string;
  companyName: string;
  freelanceId: string;
  clientStatus: ClientStatus;
  freelanceStatus: FreelanceStatus;
  cv: string;
  whyMe: string;
  freelance: string;
  freelanceEnterprise: Enterprise;
  clientDisponibility: Dayjs;
  freelanceDisponibility: Dayjs;
  city: string;
  clientProposedPrice: number;
  freelanceProposedPrice: number;
  modalities: string;
  length: string;
}

class Proposition {
  _id?: ObjectId;
  missionId: string;
  freelanceId: string;
  title: string;
  companyName: string;
  cv: string;
  clientStatus: ClientStatus;
  freelanceStatus: FreelanceStatus;
  freelance: string;
  freelanceEnterprise: Enterprise;
  clientDisponibility: Dayjs;
  freelanceDisponibility: Dayjs;
  city: string;
  clientProposedPrice: number;
  freelanceProposedPrice: number;
  modalities: string;
  length: string;
  whyMe: string;

  constructor({
    missionId,
    freelanceId,
    cv,
    title,
    length,
    companyName,
    clientStatus,
    freelanceStatus,
    freelance,
    freelanceEnterprise,
    clientDisponibility,
    freelanceDisponibility,
    city,
    whyMe,
    freelanceProposedPrice,
    clientProposedPrice,
    modalities,
  }: PropositionProps) {
    this.cv = cv;
    this.title = title;
    this.length = length;
    this.companyName = companyName;
    this.missionId = missionId;
    this.freelanceId = freelanceId;
    this.clientStatus = clientStatus;
    this.freelanceStatus = freelanceStatus;
    this.freelance = freelance;
    this.whyMe = whyMe;
    this.freelanceEnterprise = freelanceEnterprise;
    this.clientDisponibility = clientDisponibility;
    this.freelanceDisponibility = freelanceDisponibility;
    this.city = city;
    this.freelanceProposedPrice = freelanceProposedPrice;
    this.clientProposedPrice = clientProposedPrice;
    this.modalities = modalities;
  }

  async save() {
    const response = await fetch("/api/proposition", {
      method: "POST",
      body: JSON.stringify({
        cv: this.cv,
        title: this.title,
        length: this.length,
        companyName: this.companyName,
        missionId: this.missionId,
        freelanceId: this.freelanceId,
        freelanceStatus: this.freelanceStatus,
        clientDisponibility: this.clientDisponibility,
        freelanceDisponibility: this.freelanceDisponibility,
        clientStatus: this.clientStatus,
        freelance: this.freelance,
        freelanceEnterprise: this.freelanceEnterprise,
        city: this.city,
        freelanceProposedPrice: this.freelanceProposedPrice,
        clientProposedPrice: this.clientProposedPrice,
        modalities: this.modalities,
        whyMe: this.whyMe,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export default Proposition;
