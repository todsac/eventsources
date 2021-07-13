const sendgrid = require("../../sendgrid.app");

module.exports = {
  key: "sendgrid-get-all-bounces",
  name: "Get All Bounces",
  description: "Allows you to get all of your bounces.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    startTime: {
      type: "integer",
      label: "Start Time",
      description:
        "Refers start of the time range in unix timestamp when a bounce was created (inclusive).",
      optional: true,
    },
    endTime: {
      type: "integer",
      label: "End Time",
      description:
        "Refers end of the time range in unix timestamp when a bounce was created (inclusive).",
      optional: true,
    },
  },
  async run() {
    return await this.sendgrid.getAllBounces(this.startTime, this.endTime);
  },
};
