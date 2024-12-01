import { baseUrl } from "@/lib/baseUrl";
import { ObjectId } from "mongodb";
import { Dayjs } from "dayjs";

// Assuming Mission only has _id or similar reference
export interface Experience {
  jobTitle: string;
  company: string;
  typeOfContract: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
  formattedBeginningDate: string;
  formattedEndDate: string;
}

export interface Enterprise {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  siret: string;
  hasTVA: string;
}

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
  experiences: Experience[];
  missionsApproved: ObjectId[];
  missionsPendingApproval: ObjectId[];
  missionsLost: ObjectId[];
  missionsLiked: ObjectId[];
  enterprise: Enterprise;
  cv: string;
}

// Possibilité de changer la structure de mission pour avoir un object avec l'id et le statut
// de la mission (approved, pending, lost, liked)
class Freelance {
  _id: ObjectId;
  title: string;
  phone: string;
  enterprise: Enterprise;
  firstname: string;
  lastname: string;
  email: string;
  lastMission: string;
  lengthMissionWanted: string;
  descriptionMissionWanted: string;
  competences: { label: string; level: number }[];
  profilePicture: string;
  experiences: Experience[];
  missionsApproved: ObjectId[];
  missionsPendingApproval: ObjectId[];
  missionsLost: ObjectId[];
  missionsLiked: ObjectId[];
  cv: string;

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
    missionsApproved,
    missionsPendingApproval,
    missionsLost,
    missionsLiked,
    cv,
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
    this.missionsApproved = missionsApproved;
    this.missionsPendingApproval = missionsPendingApproval;
    this.missionsLost = missionsLost;
    this.missionsLiked = missionsLiked;
    this.cv = cv;
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
        missionsApproved: this.missionsApproved,
        missionsPendingApproval: this.missionsPendingApproval,
        missionsLost: this.missionsLost,
        missionsLiked: this.missionsLiked,
        experiences: this.experiences,
        cv: this.cv,
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
    const response = await fetch(
      `${baseUrl}/api/freelance/email/${this.email}`,
      {
        method: "PUT",
        body: JSON.stringify({
          _id: this._id,
          phone: this.phone,
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
          missionsApproved: this.missionsApproved,
          missionsPendingApproval: this.missionsPendingApproval,
          missionsLost: this.missionsLost,
          missionsLiked: this.missionsLiked,
          experiences: this.experiences,
          cv: this.cv,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async delete() {
    const response = await fetch(
      `${baseUrl}/api/freelance/email/${this.email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export default Freelance;
