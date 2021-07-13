const sendgrid = require("../../sendgrid.app");

module.exports = {
  key: "sendgrid-validate-email",
  name: "Validate Email",
  description:
    "Validates an email address. This action requires a Sendgrid's Pro or Premier plan.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    email: {
      type: "string",
      label: "Email",
      description: "The email that you want to validate.",
    },
    source: {
      type: "string",
      label: "Source",
      description:
        "An optional indicator of the email address's source. You may include this if you are capturing email addresses from multiple locations.",
      optional: true,
    },
  },
  async run() {
    const validate = require("validate.js");
    const constraints = {
      email: {
        presence: true,
        email: true,
      },
    };
    const validationResult = validate({ email: this.email }, constraints);
    if (validationResult) {
      throw new Error(validationResult.email);
    }
    return await this.sendgrid.validateEmail({
      email: this.email,
      source: this.source,
    });
  },
};
