import { baseUrl } from "@/lib/baseUrl";

export async function createFreelance(
  email: string,
  firstname: string,
  lastname: string
) {
  console.log("HERRRE");
  const response = await fetch(`${baseUrl}/api/freelance`, {
    method: "POST",
    body: JSON.stringify({ email, firstname, lastname }),
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

export async function getFreelanceByEmail(email: string) {
  const response = await fetch(`${baseUrl}/api/freelance/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data", data);
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateFreelance(
  email: string,
  title: string,
  phone: string,
  lastMission: string,
  lengthMissionWanted: string,
  descriptionMissionWanted: string,
  profilePicture: string
) {
  const response = await fetch(`${baseUrl}/api/freelance/${email}`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      title,
      phone,
      lastMission,
      lengthMissionWanted,
      descriptionMissionWanted,
      profilePicture,
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

export async function updateFreelanceCompetences(
  email: string,
  competences: { label: string; level: number }[]
) {
  const response = await fetch(
    `${baseUrl}/api/freelance/${email}/competences`,
    {
      method: "PUT",
      body: JSON.stringify({
        email,
        competences,
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
