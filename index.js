import cron from "node-cron";
// import { iniciarBot, mandarIssue } from "./telegram.js";
import getAllIssues from "./jira2.js";

getAllIssues();

cron.schedule("*/1 * * * *", () => {
  getAllIssues();
});

// iniciarBot();
// mandarIssue("Hola");


