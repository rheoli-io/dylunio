export default class InventoryItems {
  constructor(api, config) {
    this.api = api;
    this.config = config;
  }

  static structure() {
    return {
      name: ""
    };
  }

  getInventoryItems() {
    return this.api.findAll("inventory-items");
  }
}
