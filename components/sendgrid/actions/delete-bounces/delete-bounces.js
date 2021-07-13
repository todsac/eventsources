const sendgrid = require("../../sendgrid.app");
const validate = require("validate.js");

module.exports = {
  key: "sendgrid-delete-bounces",
  name: "Delete Bounces",
  description: "Allows you to delete all emails on your bounces list.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    deleteAll: {
      type: "boolean",
      label: "Delete All",
      description:
        "This parameter allows you to delete every email in your bounce list. This should not be used with the `emails` parameter.",
      optional: true,
    },
    emails: {
      type: "string",
      label: "Emails",
      description:
        'An array of emails to delete from your bounce list at the same time. This should not be used with the `deleteAll` parameter. Example: `["email1@example.com","email2@example.com"]`',
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
    return await this.sendgrid.deleteBounces(deleteAll, this.emails);
  },
};
