const common = require("../common/http-based");

module.exports = {
  ...common,
  key: "ringcentral-new-inbound-call",
  name: "New Inbound Call (Instant)",
  description: "Emits an event on each incoming call",
  props: {
    ...common.props,
    extensionId: { propDefinition: [common.props.ringcentral, "extensionId"] },
  },
  methods: {
    ...common.methods,
    getSupportedNotificationTypes() {
      return new Set([
        "extension-telephony-sessions-event-inbound-call",
      ]);
    },
    generateMeta(data) {
      const {
        timestamp,
        body: eventDetails,
      } = data;
      const {
        telephonySessionId: id,
      } = eventDetails;
      const {
        from: {
          phoneNumber: callerPhoneNumber,
        },
      } = eventDetails.parties[0];

      const maskedCallerNumber = this.getMaskedNumber(callerPhoneNumber);
      const summary = `New inbound call from ${maskedCallerNumber}`;
      const ts = Date.parse(timestamp);

      return {
        id,
        summary,
        ts,
      };
    },
    isEventRelevant(event) {
      const { body: eventDetails } = event.body;
      const {
        status: { code: statusCode }
      } = eventDetails.parties[0];
      return statusCode === "Setup";
    },
  },
};
