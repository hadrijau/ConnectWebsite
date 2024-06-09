import { baseUrl } from "@/lib/baseUrl";

export async function getPropositionsByMissionId(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/proposition/mission/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
}

export async function getPropositionsByFreelanceId(slug: string) {
  const res = await fetch(`${baseUrl}/api/proposition/freelance/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
