// interface for interacting with sqlite3 database
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./jira.db");

// create table if it doesn't exist
db.run(
  "CREATE TABLE IF NOT EXISTS issues (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, summary TEXT, status TEXT, created TEXT, updated TEXT)"
);

// insert issue into database
const insertIssue = (issue) => {
  db.run(
    "INSERT INTO issues (key, summary, status, created, updated) VALUES (?, ?, ?, ?, ?)",
    [
      issue.key,
      issue.fields.summary,
      issue.fields.status.name,
      issue.fields.created,
      issue.fields.updated,
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Issue ${issue.key} inserted into database`);
      }
    }
  );
};

// get all issues from database
const getIssues = (callback) => {
  db.all("SELECT * FROM issues", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      callback(rows);
    }
  });
};

// update issue in database
const updateIssue = (issue) => {
  db.run(
    "UPDATE issues SET status = ?, updated = ? WHERE key = ?",
    [issue.fields.status.name, issue.fields.updated, issue.key],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Issue ${issue.key} updated in database`);
      }
    }
  );
};

// delete issue from database
const deleteIssue = (key) => {
  db.run("DELETE FROM issues WHERE key = ?", [key], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Issue ${key} deleted from database`);
    }
  });
};

module.exports = {
  insertIssue,
  getIssues,
  updateIssue,
}