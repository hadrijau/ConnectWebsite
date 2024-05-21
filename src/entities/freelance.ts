export interface Freelance {
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
