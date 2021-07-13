const sendgrid = require("../../sendgrid.app");
var validate = require("validate.js");

module.exports = {
  key: "sendgrid-list-global-supressions",
  name: "List Global Supression",
  description:
    "Allows you to get a list of all email address that are globally suppressed.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    startTime: {
      type: "integer",
      label: "Start Time",
      description:
        "Refers start of the time range in unix timestamp when an unsubscribe email was created (inclusive).",
      optional: true,
    },
    endTime: {
      type: "integer",
      label: "End Time",
      description:
        "Refers end of the time range in unix timestamp when an unsubscribe email was created (inclusive).",
      optional: true,
    },
    numberOfSupressions: {
      type: "integer",
      label: "Max # of Global Supressions to Return",
      description: "Indicates the max number of global supressions to return.",
    },
  },
  async run() {
    const constraints = {
      numberOfSupressions: {
        presence: true,
      },
    };
    const validate = require("validate.js");
    const constraints = {
      numberOfSupressions: {
        presence: true,
        type: "array",
      },
    };
    const validationResult = validate(
      { numberOfSupressions: this.numberOfSupressions },
      constraints
    );
    if (validationResult) {
      throw new Error(validationResult.numberOfSupressions);
    }
    const globalSupressionsGenerator =
      await this.sendgrid.listGlobalSupressions(
        this.startTime,
        this.endTime,
        this.numberOfSupressions
      );
    const globalSupressions = [];
    let globalSupression;
    do {
      globalSupression = await globalSupressionsGenerator.next();
      if (globalSupression.value) {
        globalSupressions.push(globalSupression.value);
      }
    } while (!globalSupression.done);
    return globalSupressions;
  },
};
