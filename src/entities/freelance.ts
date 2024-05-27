import { baseUrl } from "@/lib/baseUrl";
import { ObjectId } from "mongodb";

interface FreelanceProps {
  _id: ObjectId;
  title: string;
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  lastMission: string;
  lengthMissionWanted: string;
  descriptionMissionWanted: string;
  competences: { label: string; level: number }[];
  profilePicture: string;
}

class Freelance {
  _id: ObjectId;
  title: string;
  phone: string;
  firstname: string;
  lastname: string;
  email: string;
  lastMission: string;
  lengthMissionWanted: string;
  descriptionMissionWanted: string;
  competences: { label: string; level: number }[];
  profilePicture: string;

  constructor({
    _id,
    title,
    phone,
    firstname,
    lastname,
    email,
    lastMission,
    lengthMissionWanted,
    descriptionMissionWanted,
    competences,
    profilePicture,
  }: FreelanceProps) {
    this._id = _id;
    this.title = title;
    this.phone = phone;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.lastMission = lastMission;
    this.lengthMissionWanted = lengthMissionWanted;
    this.descriptionMissionWanted = descriptionMissionWanted;
    this.competences = competences;
    this.profilePicture = profilePicture;
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
        lastMission: this.lastMission,
        lengthMissionWanted: this.lengthMissionWanted,
        descriptionMissionWanted: this.descriptionMissionWanted,
        competences: this.competences,
        profilePicture: this.profilePicture,
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("DATA", data);
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export default Freelance;
