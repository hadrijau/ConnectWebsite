import { baseUrl } from "@/lib/baseUrl";

export async function createClient(
  email: string,
  firstname: string,
  lastname: string
) {
  const response = await fetch("/api/client", {
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

export async function updateClient(
  email: string,
  domainName: string,
  phoneNumber: string,
  address: string,
  postalCode: string,
  city: string,
  description: string
) {
  const response = await fetch(`${baseUrl}/api/client/${email}`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      domainName,
      phoneNumber,
      address,
      postalCode,
      city,
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

export async function getClientByEmail(email: string) {
  const response = await fetch(`${baseUrl}/api/client/${email}`, {
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

export async function getMissionByIdForClientById(
  missionId: string,
  clientId: string
) {
  const response = await fetch(
    `${baseUrl}/api/client/${clientId}/mission/${missionId}`,
    {
      method: "GET",
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

export async function getAllAcceptedMissionsByClientId(clientId: string) {
  const response = await fetch(`${baseUrl}/api/client/mission/${clientId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch accepted missions");
  }
  const data = await response.json();
  return data;
}
