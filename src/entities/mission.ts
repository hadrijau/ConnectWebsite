import { ObjectId } from "mongodb";
import { Dayjs } from "dayjs";

export enum MissionStatus {
  PUBLISHED = "Publié",
  STARTED = "Commencé",
}

export enum ClientStatus {
  UNOPENED = "Non ouvert",
  OPENED = "Ouvert",
}

export interface Proposition {
  missionId: string;
  freelanceId: string;
  status: ClientStatus;
  whyMe: string;
  freelanceDisponibility: Dayjs;
  freelanceProposedPrice: number;
}

interface MissionProps {
  clientId: ObjectId;
  acceptedFreelanceId: ObjectId;
  title: string;
  context: string;
  goals: string;
  date: Dayjs;
  price: string;
  length: string;
  modalities: string;
  competences: { label: string; level: number }[];
  companyName: string;
  hiddenCompany: boolean;
  hiddenMissionPlace: boolean;
  hiddenTJM: boolean;
  aoId: string;
  city: string;
  postalCode: string;
  status: MissionStatus;
  _id?: ObjectId;
  propositions: Proposition[];
}

class Mission {
  _id?: ObjectId;
  clientId: ObjectId;
  acceptedFreelanceId: ObjectId;
  title: string;
  context: string;
  goals: string;
  companyName: string;
  date: Dayjs;
  price: string;
  length: string;
  modalities: string;
  status: MissionStatus;
  competences: { label: string; level: number }[];
  createdAt: Date;
  hiddenCompany: boolean;
  hiddenMissionPlace: boolean;
  hiddenTJM: boolean;
  aoId: string;
  city: string;
  postalCode: string;
  propositions: Proposition[];

  constructor({
    clientId,
    acceptedFreelanceId,
    title,
    context,
    goals,
    date,
    price,
    length,
    modalities,
    companyName,
    competences,
    hiddenCompany,
    hiddenMissionPlace,
    hiddenTJM,
    aoId,
    city,
    status,
    postalCode,
    _id,
    propositions,
  }: MissionProps) {
    this.clientId = clientId;
    this.acceptedFreelanceId = acceptedFreelanceId;
    this.title = title;
    this.context = context;
    this.goals = goals;
    this.status = status;
    this.date = date;
    this.price = price;
    this.companyName = companyName;
    this.length = length;
    this.modalities = modalities;
    this.competences = competences;
    this.createdAt = new Date();
    this.hiddenCompany = hiddenCompany;
    this.hiddenMissionPlace = hiddenMissionPlace;
    this.hiddenTJM = hiddenTJM;
    this.aoId = aoId;
    this.city = city;
    this.postalCode = postalCode;
    this.propositions = propositions;
    if (_id) {
      this._id = _id;
    }
  }

  async save() {
    const response = await fetch("/api/mission", {
      method: "POST",
      body: JSON.stringify({
        acceptedFreelanceId: this.acceptedFreelanceId,
        clientId: this.clientId,
        title: this.title,
        context: this.context,
        goals: this.goals,
        date: this.date,
        price: this.price,
        length: this.length,
        status: this.status,
        modalities: this.modalities,
        competences: this.competences,
        createdAt: this.createdAt,
        companyName: this.companyName,
        hiddenCompany: this.hiddenCompany,
        hiddenMissionPlace: this.hiddenMissionPlace,
        hiddenTJM: this.hiddenTJM,
        aoId: this.aoId,
        city: this.city,
        postalCode: this.postalCode,
        propositions: this.propositions,
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

  async update() {
    if (!this._id) {
      throw new Error("Mission ID (_id) is required for update");
    }

    const response = await fetch(`/api/mission/${this._id}`, {
      method: "PUT",
      body: JSON.stringify({
        acceptedFreelanceId: this.acceptedFreelanceId,
        clientId: this.clientId,
        title: this.title,
        context: this.context,
        goals: this.goals,
        date: this.date,
        price: this.price,
        length: this.length,
        status: this.status,
        modalities: this.modalities,
        competences: this.competences,
        createdAt: this.createdAt,
        companyName: this.companyName,
        hiddenCompany: this.hiddenCompany,
        hiddenMissionPlace: this.hiddenMissionPlace,
        hiddenTJM: this.hiddenTJM,
        aoId: this.aoId,
        city: this.city,
        postalCode: this.postalCode,
        propositions: this.propositions,
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

export default Mission;
