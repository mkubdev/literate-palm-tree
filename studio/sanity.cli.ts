import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "8b9euu7b", dataset: "production" },
  studioHost: "simon-bouvatier",
  deployment: { appId: "qe6rf2e6jahvscv8jr97w4hk", autoUpdates: true },
});
