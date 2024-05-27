import { ObjectId } from "mongodb";
import dayjs, { Dayjs } from "dayjs";

interface PropositionProps {
  missionId: ObjectId;
  statut: string;
  freelance: string;
  freelanceEnterprise: string;
  disponibility: Dayjs;
  city: string;
  proposedPrice: string;
}

class Proposition {
  missionId: ObjectId;
  statut: string;
  freelance: string;
  freelanceEnterprise: string;
  disponibility: Dayjs;
  city: string;
  proposedPrice: string;

  constructor({
    missionId,
    statut,
    freelance,
    freelanceEnterprise,
    disponibility,
    city,
    proposedPrice,
  }: PropositionProps) {
    this.missionId = missionId;
    this.statut = statut;
    this.freelance = freelance;
    this.freelanceEnterprise = freelanceEnterprise;
    this.disponibility = disponibility;
    this.city = city;
    this.proposedPrice = proposedPrice;
  }
}

export default Proposition;
