const sendgrid = require("../../sendgrid.app");
const validate = require("validate.js");

module.exports = {
  key: "sendgrid-list-blocks",
  name: "List Blocks",
  description:
    "Allows you to list all email addresses that are currently on your blocks list.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    startTime: {
      type: "integer",
      label: "Start Time",
      description:
        "The start of the time range when a blocked email was created (inclusive). This is a unix timestamp.",
      optional: true,
    },
    endTime: {
      type: "integer",
      label: "End Time",
      description:
        "The end of the time range when a blocked email was created (inclusive). This is a unix timestamp.",
      optional: true,
    },
    numberOfBlocks: {
      type: "integer",
      label: "Max # of Blocks to Return",
      description: "Indicates the max number of blocked emails to return.",
    },
  },
  async run() {
    const constraints = {
      numberOfBlocks: {
        presence: true,
      },
    };
    const validationResult = validate(
      { numberOfBlocks: this.numberOfBlocks },
      constraints
    );
    if (validationResult) {
      throw new Error(validationResult.numberOfBlocks);
    }
    const blocksGenerator = await this.sendgrid.listBlocks(
      this.startTime,
      this.endTime,
      this.numberOfBlocks
    );
    const blocks = [];
    let block;
    do {
      block = await blocksGenerator.next();
      if (block.value) {
        blocks.push(block.value);
      }
    } while (!block.done);
    return blocks;
  },
};
