const sendgrid = require("../../sendgrid.app");
const validate = require("validate.js");

module.exports = {
  key: "sendgrid-delete-blocks",
  name: "Delete Blocks",
  description: "Allows you to delete all email addresses on your blocks list.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    deleteAll: {
      type: "boolean",
      label: "Delete All",
      description:
        "Indicates if you want to delete all blocked email addresses.",
      optional: true,
    },
    emails: {
      type: "string",
      label: "Emails",
      description:
        'An array of the specific blocked email addresses that you want to delete. Example: `["email1@example.com","email2@example.com"]`',
      optional: true,
    },
  },
  async run() {
    const constraints = {
      emails: {
        type: "array",
      },
    };
    const validationResult = validate({ emails: this.emails }, constraints);
    if (validationResult) {
      throw new Error(validationResult.emails);
    }
    const deleteAll = !!this.deleteAll;
    return await this.sendgrid.deleteBlocks(deleteAll, this.emails);
  },
};
