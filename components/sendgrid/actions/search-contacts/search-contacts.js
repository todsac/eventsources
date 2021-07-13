const sendgrid = require("../../sendgrid.app");

module.exports = {
  key: "sendgrid-search-contacts",
  name: "Search Contacts",
  description: "Searches contacts with a SGQL query.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    query: {
      type: "string",
      label: "Query",
      description:
        "The query field accepts valid SGQL for searching for a contact. Only the first 50 contacts will be returned. If the query takes longer than 20 seconds a 408 Request Timeout will be returned.",
    },
  },
  async run() {
    const validate = require("validate.js");
    const constraints = {
      query: {
        presence: true,
      },
    };
    const validationResult = validate({ query: this.query }, constraints);
    if (validationResult) {
      throw new Error(validationResult.query);
    }
    return await this.sendgrid.searchContacts(this.query);
  },
};
