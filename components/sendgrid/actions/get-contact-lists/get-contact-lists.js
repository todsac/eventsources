const sendgrid = require("../../sendgrid.app");
const validate = require("validate.js");

module.exports = {
  key: "sendgrid-get-contact-lists",
  name: "Get Contact Lists",
  description: "Allows you to get details of your contact lists.",
  version: "0.0.1",
  type: "action",
  props: {
    sendgrid,
    numberOfLists: {
      type: "integer",
      label: "Number of Lists",
      description: "The number of contact lists to return.",
    },
  },
  async run() {
    const constraints = {
      numberOfLists: {
        presence: true,
      },
    };
    const validationResult = validate(
      { numberOfLists: this.numberOfLists },
      constraints
    );
    if (validationResult) {
      throw new Error(validationResult.numberOfLists);
    }
    const contactListGenerator = this.sendgrid.getAllContactLists(
      this.numberOfLists
    );
    const contactLists = [];
    let contactList;
    do {
      contactList = await contactListGenerator.next();
      if (contactList.value) {
        contactLists.push(contactList.value);
      }
    } while (!contactList.done);
    return contactLists;
  },
};
