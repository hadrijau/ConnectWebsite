import { ObjectId } from "mongodb";
import dayjs, { Dayjs } from "dayjs";

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
  missionId: ObjectId;
  freelanceId: ObjectId;
  clientStatus: ClientStatus;
  freelanceStatus: FreelanceStatus;
  cv: string;
  whyMe: string;
  freelance: string;
  freelanceEnterprise: string;
  clientDisponibility: Dayjs;
  freelanceDisponibility: Dayjs;
  city: string;
  clientProposedPrice: string;
  freelanceProposedPrice: string;
  modalities: string;
}

class Proposition {
  missionId: ObjectId;
  freelanceId: ObjectId;
  cv: string;
  clientStatus: ClientStatus;
  freelanceStatus: FreelanceStatus;
  freelance: string;
  freelanceEnterprise: string;
  clientDisponibility: Dayjs;
  freelanceDisponibility: Dayjs;
  city: string;
  clientProposedPrice: string;
  freelanceProposedPrice: string;
  modalities: string;

  constructor({
    missionId,
    freelanceId,
    cv,
    clientStatus,
    freelanceStatus,
    freelance,
    freelanceEnterprise,
    clientDisponibility,
    freelanceDisponibility,
    city,
    freelanceProposedPrice,
    clientProposedPrice,
    modalities,
  }: PropositionProps) {
    this.cv = cv;
    this.missionId = missionId;
    this.freelanceId = freelanceId;
    this.clientStatus = clientStatus;
    this.freelanceStatus = freelanceStatus;
    this.freelance = freelance;
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
