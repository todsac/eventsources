const sendgrid = require("../../sendgrid.app");
const validate = require("validate.js");

module.exports = {
  key: "sendgrid-remove-a-contact-from-a-list",
  name: "Remove A Contact From A List",
  description: "Allows you to remove contacts from a given list.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    id: {
      type: "string",
      label: "Id",
      description:
        "Unique Id of the List where the contact to remove off is located.",
    },
    contactIds: {
      type: "string",
      label: "Contact Ids",
      description:
        "Comma separated list of contact ids to be removed off the list.",
    },
  },
  async run() {
    const constraints = {
      id: {
        presence: true,
      },
      contactIds: {
        presence: true,
      },
    };
    const validationResult = validate(
      { id: this.id, contactIds: this.contactIds },
      constraints
    );
    if (validationResult) {
      let validationResultKeys = Object.keys(validationResult);
      let validationMessages;
      if (validationResultKeys.length == 1) {
        validationMessages = validationResult[validationResultKeys[0]];
      } else {
        validationMessages =
          "Parameters validation failed with the following errors:\t";
        validationResultKeys.forEach(
          (validationResultKey) =>
            (validationMessages += `${validationResult[validationResultKey]}\t`)
        );
      }
      throw new Error(validationMessages);
    }
    return await this.sendgrid.removeContactFromList(this.id, this.contactIds);
  },
};
