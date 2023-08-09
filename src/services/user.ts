import { getNavigatorLanguage } from "..";
import { url_api_validator } from "../api/constant";
import i18n from "i18next";
interface RegisterForm {
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
  Prefijo?: string;
  Telefono?: string;
}

class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async loginWithForm(value: { email: string; password: string }) {
    const response = await fetch(`${url_api_validator}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return await response.json();
  }

  async updateUser(user: any) {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${url_api_validator}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  }

  async getUserData() {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${url_api_validator}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }

  setLanguage(lang: string) {
    i18n.changeLanguage(lang || getNavigatorLanguage());
  }
}

export const userService = new UserService();
