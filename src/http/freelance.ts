import { baseUrl } from "@/lib/baseUrl";

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
