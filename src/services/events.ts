import { url_api_validator } from "../api/constant";

class EventsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getEventsData = async () => {
    const token = localStorage.getItem("auth_token");
    const lang = localStorage.getItem("lang");
    return fetch(`${url_api_validator}/events?locale=${lang ?? 'es'}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getEventDetailData = async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const lang = localStorage.getItem("lang");
    const query = "populate=*,Configuracion.Instancias.Direccion&";

    const response = await fetch(
      `${url_api_validator}/events/${id}?locale=${lang}&${query}`,
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

  createPromotionCode = async (code: string, user: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${url_api_validator}/${code}/scan`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticketHolder: {
          name: user.nombre,
          lastName: user.apellido,
          phone: user.telefono,
          email: user.email,
          id: user.id,
          usedPromotionalCodes: [],
        },
      }),
    });

    return await response.json();
  };
}

export const eventsService = new EventsService();
