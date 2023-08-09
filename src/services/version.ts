import { url_api } from "../api/constant";

class VersionService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  async getAppVersion() {
    const response = await fetch(`${url_api}/versions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return await response.json()
  }
}

export const versionService = new VersionService()