export default class {
  static getWpApiBaseUrl() {
    return process.server
      ? process.env.INTERNAL_API_URL
      : process.env.EXTERNAL_API_URL
  }
}
