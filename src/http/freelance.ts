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
  desiredMissionLength: string,
  description: string
) {
  const response = await fetch(`${baseUrl}/api/freelance/${email}`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      title,
      phone,
      lastMission,
      desiredMissionLength,
      description,
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
