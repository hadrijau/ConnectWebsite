import { baseUrl } from "@/lib/baseUrl";

export async function getMissions() {
  const res = await fetch(`${baseUrl}/api/mission`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function getMissionsByClientId(slug: string) {
  const res = await fetch(`${baseUrl}/api/mission/client/${slug}`, {
    cache: "no-store",
  });

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
  return data;
}

export async function deleteMission(slug: string) {
  const response = await fetch(`${baseUrl}/api/mission/${slug}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete mission");
  }

  return { message: "Mission deleted successfully" };
}
