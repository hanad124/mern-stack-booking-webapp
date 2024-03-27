import { registerFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const register = async (formData: registerFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const respoenseBody = await response.json();

  if (!response.ok) {
    throw new Error(respoenseBody.message);
  }
};
