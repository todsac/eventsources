const sendgrid = require("../../sendgrid.app");
var validate = require("validate.js");

module.exports = {
  key: "sendgrid-add-email-to-global-supression",
  name: "Add Email To Global Supression",
  description:
    "Allows you to add one or more email addresses to the global suppressions group.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    recipientEmails: {
      type: "object",
      label: "Recipient Emails",
      description:
        'An array of email addresses to be added to the global suppressions group. Example `["email1@example.com","email2@example.com"]`',
    },
  },
  async run() {
    const constraints = {
      recipientEmails: {
        presence: true,
        type: "array",
      },
    };
    const validationResult = validate(
      { recipientEmails: this.recipientEmails },
      constraints
    );
    if (validationResult) {
      const validationResultKeys = Object.keys(validationResult);
      let validationMessages = validationResult[validationResultKeys[0]];
      throw new Error(validationMessages);
    }
    return await this.sendgrid.addEmailToGlobalSupression(this.recipientEmails);
  },
};
