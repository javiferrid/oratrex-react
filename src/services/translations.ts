import { url_api_validator } from '../api/constant';

class TranslationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  getTranslations = async () => {
    const query =
      'populate=*&filters[ticketeras][Nombre][$eq]=Kombutxa'

    const response = await fetch(
      `${url_api_validator}/translations?${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return await response.json();
  }
}

export const translationService = new TranslationService();
