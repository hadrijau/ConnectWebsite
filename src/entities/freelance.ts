import { baseUrl } from "@/lib/baseUrl";
import { ObjectId } from "mongodb";
import { Dayjs } from "dayjs";

export interface Experience {
  jobTitle: string;
  company: string;
  typeOfContract: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
  formattedBeginningDate: string;
  formattedEndDate: string;
}

interface FreelanceProps {
  _id: ObjectId;
  title: string;
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  lastMission: string;
  enterprise: string;
  lengthMissionWanted: string;
  descriptionMissionWanted: string;
  competences: { label: string; level: number }[];
  profilePicture: string;
  experiences: Experience[];
}

class Freelance {
  _id: ObjectId;
  title: string;
  phone: string;
  enterprise: string;
  firstname: string;
  lastname: string;
  email: string;
  lastMission: string;
  lengthMissionWanted: string;
  descriptionMissionWanted: string;
  competences: { label: string; level: number }[];
  profilePicture: string;
  experiences: Experience[];

  constructor({
    _id,
    title,
    phone,
    firstname,
    lastname,
    email,
    enterprise,
    lastMission,
    lengthMissionWanted,
    descriptionMissionWanted,
    competences,
    profilePicture,
    experiences,
  }: FreelanceProps) {
    this._id = _id;
    this.title = title;
    this.enterprise = enterprise;
    this.phone = phone;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.lastMission = lastMission;
    this.lengthMissionWanted = lengthMissionWanted;
    this.descriptionMissionWanted = descriptionMissionWanted;
    this.competences = competences;
    this.profilePicture = profilePicture;
    this.experiences = experiences;
  }

  async save() {
    const response = await fetch(`${baseUrl}/api/freelance`, {
      method: "POST",
      body: JSON.stringify({
        _id: this._id,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        title: this.title,
        enterprise: this.enterprise,
        lastMission: this.lastMission,
        lengthMissionWanted: this.lengthMissionWanted,
        descriptionMissionWanted: this.descriptionMissionWanted,
        competences: this.competences,
        profilePicture: this.profilePicture,
        experiences: this.experiences,
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
    const response = await fetch(`${baseUrl}/api/freelance/${this.email}`, {
      method: "PUT",
      body: JSON.stringify({
        _id: this._id,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        title: this.title,
        lastMission: this.lastMission,
        lengthMissionWanted: this.lengthMissionWanted,
        descriptionMissionWanted: this.descriptionMissionWanted,
        competences: this.competences,
        profilePicture: this.profilePicture,
        experiences: this.experiences,
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

export default Freelance;
