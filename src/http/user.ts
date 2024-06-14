import { baseUrl } from "@/lib/baseUrl";

export async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  type: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, firstname, lastname, type }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.user;
}

export async function getUserByEmail(email: string) {
  try {
    const response = await fetch(`${baseUrl}/api/user/${email}`, {
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
  } catch (err) {
    console.log("err", err);
  }
}

export async function updateUser(email: string, type: string) {
  const response = await fetch(`/api/user/${email}`, {
    method: "PUT",
    body: JSON.stringify({ type }),
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

export async function deleteUser(email: string) {
  const response = await fetch(`/api/user/${email}`, {
    method: "DELETE",
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
