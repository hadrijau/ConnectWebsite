import { baseUrl } from "@/lib/baseUrl";
import { Dayjs } from "dayjs";
import { ObjectId } from "mongodb";
export async function createMission(
  title: string,
  context: string,
  goals: string,
  date: Dayjs,
  price: number,
  length: string,
  modalities: string,
  competences: { label: string; level: number }[]
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
      competences,
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

  const data = await res.json();
  return data;
}

export async function getMissionById(slug: string) {
  const res = await fetch(`${baseUrl}/api/mission/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log("DATA", data);
  return data;
}

export async function updateMissionById(
  slug: ObjectId,
  title: string,
  context: string,
  goals: string,
  date: Dayjs,
  price: number,
  length: string,
  modalities: string,
  competences: { label: string; level: number }[]
) {
  console.log("goes here");
  const response = await fetch(`/api/mission/${slug}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      context,
      goals,
      date,
      price,
      length,
      modalities,
      competences,
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
