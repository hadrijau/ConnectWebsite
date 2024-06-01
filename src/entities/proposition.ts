import { ObjectId } from "mongodb";
import dayjs, { Dayjs } from "dayjs";

export enum Statut {
  UNOPENED = "Non ouvert",
  OPENED = "Ouvert"
}
interface PropositionProps {
  missionId: ObjectId;
  freelanceId: ObjectId;
  statut: Statut;
  cv: string;
  whyMe: string;
  freelance: string;
  freelanceEnterprise: string;
  disponibility: Dayjs;
  city: string;
  proposedPrice: string;
}

class Proposition {
  missionId: ObjectId;
  freelanceId: ObjectId;
  cv: string;
  statut: string;
  freelance: string;
  freelanceEnterprise: string;
  disponibility: Dayjs;
  city: string;
  proposedPrice: string;

  constructor({
    missionId,
    freelanceId,
    cv,
    statut,
    freelance,
    freelanceEnterprise,
    disponibility,
    city,
    proposedPrice,
  }: PropositionProps) {
    this.cv = cv;
    this.missionId = missionId;
    this.freelanceId = freelanceId;
    this.statut = statut;
    this.freelance = freelance;
    this.freelanceEnterprise = freelanceEnterprise;
    this.disponibility = disponibility;
    this.city = city;
    this.proposedPrice = proposedPrice;
  }
}

export default Proposition;
