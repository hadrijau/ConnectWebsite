import { baseUrl } from "@/lib/baseUrl";
import { Dayjs } from "dayjs";
export async function createMission(
  title: string,
  context: string,
  goals: string,
  date: Dayjs,
  price: number,
  length: number,
  modalities: string
) {
  const response = await fetch("/api/mission", {
    method: "POST",
    body: JSON.stringify({
      title,
      context,
      goals,
      date,
      price,
      length,
      modalities,
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

export async function getMissions() {
  const res = await fetch(`${baseUrl}/api/mission`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
