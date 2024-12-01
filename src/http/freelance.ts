import { baseUrl } from "@/lib/baseUrl";

export async function getFreelanceByEmail(email: string) {
  const response = await fetch(`${baseUrl}/api/freelance/email/${email}`, {
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

export async function getFreelanceById(id: string) {
  const response = await fetch(`${baseUrl}/api/freelance/${id}`, {
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

export async function getAllMissionsByFreelanceId(freelanceId: string) {
  const response = await fetch(
    `${baseUrl}/api/freelance/mission/${freelanceId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch missions");
  }
  const data = await response.json();
  return data;
}
