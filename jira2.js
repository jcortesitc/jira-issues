import axios from "axios";
import dotenv from "dotenv";
import ProgressBar from "progress";
import chalk from "chalk";
import columnify from "columnify";

dotenv.config();

const baseUrl = process.env.BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      `${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`
    ).toString("base64")}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

let columns = columnify([{}]);

const consoleIssueFields = (oneIssue) => {
  if (oneIssue.fields.asignee === undefined) {
    oneIssue.fields.asignee = { displayName: "Unassigned" };
  }

  console.log(
    `Issue Key:  ${chalk.green(oneIssue.key)}
Issue Link:  ${oneIssue.self}    
Issue Summary:  ${oneIssue.fields.summary} 
Issue Status:  ${oneIssue.fields.status.name}
Issue Assignee:  ${chalk.red(oneIssue.fields.asignee.displayName)}
Issue Reporter:  ${oneIssue.fields.reporter.displayName}
Issue Created:  ${oneIssue.fields.created} `
  );
  console.log("--------------------------------------------------");
  return;
};
let start = 1;

const getDatabaseIssues = () => {
  axiosInstance
    .get(
      `/rest/api/3/search?jql=project = ING AND assignee = EMPTY ORDER BY created DESC, key DESC &maxresults=5`
    )
    .then((response) => {
      process.stdout.write("\x1Bc");
      const bar = new ProgressBar(":bar", { total: 50 });
      const timer = setInterval(() => {
        bar.tick();
        if (bar.complete) {
          clearInterval(timer);
        }
      }, 1080);
      const jiraIssues = response.data.issues;
      console.log(
        chalk.yellow("Este Script se ha ejecutado ") +
          chalk.green(start++) +
          chalk.yellow(" veces")
      );
      consoleIssueFields(jiraIssues[0]);
      consoleIssueFields(jiraIssues[1]);
      consoleIssueFields(jiraIssues[2]);
      consoleIssueFields(jiraIssues[3]);
      consoleIssueFields(jiraIssues[4]);
      console.log(
        chalk.yellow("--------------------------------------------------")
      );
      return;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getDatabaseIssues;

//
