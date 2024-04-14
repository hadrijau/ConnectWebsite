import { ObjectId } from "mongodb";

export interface Mission {
  _id: ObjectId;
  title: string;
  context: string;
  goals: string;
  date: Date;
  price: number;
  length: string;
  modalities: string;
  propositions: number;
  competences: { label: string; level: number }[];
}
