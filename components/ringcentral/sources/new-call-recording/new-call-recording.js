const common = require("../common/timer-based");

module.exports = {
  ...common,
  key: "ringcentral-new-call-recording",
  name: "New Call Recording",
  description: "Emits an event when a call recording is created",
  props: {
    ...common.props,
    extensionId: { propDefinition: [common.props.ringcentral, "extensionId"] },
  },
  methods: {
    ...common.methods,
    generateMeta(data) {
      const {
        id,
        startTime: timestamp,
      } = data;

      const summary = `New call recording`;
      const ts = Date.parse(timestamp);

      return {
        id,
        summary,
        ts,
      };
    },
    async processEvent(opts) {
      const {
        dateFrom,
        dateTo,
      } = opts;

      const callRecordingsScan = this.ringcentral.getCallRecordings(
        this.extensionId,
        dateFrom,
        dateTo,
      );
      for await (const record of callRecordingsScan) {
        const meta = this.generateMeta(record);
        this.$emit(record, meta);
      }
    }
  },
};
