import { url_api_validator } from "../api/constant";

class TicketsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getTicketByCode = async (code: string) => {
    const lang = localStorage.getItem("lang");
    const token = localStorage.getItem("auth_token");
    const filters = `filters[ticketCodeInformation][codeData]=${code}`;
    const populates = `populate[0]=tipo_ticket.Evento.Configuracion&populate[1]=tipo_ticket.Evento.Portada&populate[2]=tipo_ticket.instancia.Direccion&populate[3]=tipo_ticket.instancia.Periodo`;
    const query = `${filters}&${populates}`;
    const ticketResponse = await fetch(`${url_api_validator}/tickets?locale=${lang}&${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await ticketResponse.json();
  };

  getTickerAndTicketHolder = async (code: string) => {
    const token = localStorage.getItem("auth_token");
    const data = await this.getTicketByCode(code);
    if (!data || !data.length) {
      throw new Error("No se encontró la entrada");
    }

    const [ticket] = data;
    const usersQuery = `filters[tickets]=${ticket.id}`;
    const userResponse = await fetch(`${url_api_validator}/users?${usersQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await userResponse.json();
    if (!userData || !userData.length) {
      throw new Error("No se encontró el propietario de la entrada");
    }

    const [user] = userData;
    return {
      user,
      ticket,
    };
  };

  updateTicketAsUsed = async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${url_api_validator}/markTicketAsUsed/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    return await response.json();
  };

  updateTicketById = async (id: string, status: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${url_api_validator}/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        status,
      }),
    });

    return await response.json();
  };

  getInitialMsg = async (lang: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `${url_api_validator}/custom-messages?populate=imagen&locale=${lang}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  };
}

export const ticketsService = new TicketsService();
