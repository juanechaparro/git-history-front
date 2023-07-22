import React, { useEffect, useState } from "react";
import axios from "axios";

const CommitHistory = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/git") // URL del endpoint del backend
      .then((response) => setCommits(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Git Commit History</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            <strong>{commit.author}</strong> - {commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitHistory;
