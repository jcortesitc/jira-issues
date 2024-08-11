// const axios = require("axios");
// const dotenv = require("dotenv");
// const cors = require("cors");
// dotenv.config();

// const baseUrl = process.env.BASE_URL;
// const apiKey = process.env.API_KEY;

// const axiosInstance = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Basic ${Buffer.from(
//       `${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`
//     ).toString("base64")}`,
//   },
// });

// // Use CORS middleware
// axiosInstance.interceptors.request.use((config) => {
//   config.headers["Access-Control-Allow-Origin"] = "*";
//   return config;
// });

// // if field is undefined return "undefined"



// const getIssues = () => {
//   axiosInstance
//     .get(
//       `/rest/api/3/search?jql=project = ING AND "Request Type" in ("Ejecución de SQL (ING)") ORDER BY created DESC, key DESC`
//     )
//     .then((response) => {
//       const jiraIssues = response.data.issues;
//       console.log(jiraIssues[0]);
//       return jiraIssues;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// getIssues();
