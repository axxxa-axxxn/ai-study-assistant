const API_URL = "http://127.0.0.1:5000";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
}


// ============================================================
// RAG CHAT
// ============================================================

export async function askRag(question) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${API_URL}/api/rag/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: question,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "RAG request failed");
  }

  return data;
}
