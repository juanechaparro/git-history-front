import { useState, useEffect } from "react";
import axios from "axios";

const useCommitHistory = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/git") // URL del endpoint del backend
      .then((response) => setCommits(response.data))
      .catch((error) => console.error(error));
  }, []);

  return commits;
};

export default useCommitHistory;
