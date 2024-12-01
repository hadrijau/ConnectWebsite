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

export async function getMissionById(missionId: string) {
  const res = await fetch(`${baseUrl}/api/mission/${missionId}`, {
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

export async function getPropositionsByMissionIdByFreelanceId(
  missionId: string,
  freelanceId: string
) {
  const res = await fetch(
    `${baseUrl}/api/mission/${missionId}/${freelanceId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function getPropositionsByFreelanceId(freelanceId: string) {
  const res = await fetch(`${baseUrl}/api/mission/freelance/${freelanceId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function updatePropositionStatus(
  missionId: string,
  freelanceId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch("/api/mission/proposition", {
      method: "PUT",
      body: JSON.stringify({
        missionId,
        freelanceId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to update proposition status.",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error updating proposition status:", error);
    return {
      success: false,
      error: (error as Error).message || "Unexpected error occurred.",
    };
  }
}

export async function deleteProposition(
  missionId: string,
  freelanceId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch("/api/mission/proposition", {
      method: "DELETE",
      body: JSON.stringify({
        missionId,
        freelanceId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to delete proposition.",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error deleting proposition:", error);
    return {
      success: false,
      error: (error as Error).message || "Unexpected error occurred.",
    };
  }
}
