const common = require("../common-polling.js");
const get = require("lodash/get");

module.exports = {
  ...common,
  key: "calendly-new-event-type",
  name: "New Event Type",
  description: "Emits an event for each new event type",
  version: "0.0.2",
  dedupe: "unique",
  methods: {
    ...common.methods,
    async getResults() {
      return await this.calendly.getEventTypes();
    },
    isRelevant(eventType, lastEvent) {
      const createdAt = Date.parse(get(eventType, "attributes.created_at"));
      return createdAt > lastEvent;
    },
    generateMeta({ id, attributes }) {
      return {
        id,
        summary: attributes.name,
        ts: Date.now(),
      };
    },
  },
};