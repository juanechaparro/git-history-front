import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js";

const CommitHistory = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/git") // URL del endpoint del backend
      .then((response) => setCommits(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (commits.length > 0) {
      createChart();
    }
  }, [commits]);

  const createChart = () => {
    const dates = commits.map((commit) =>
      new Date(commit.date).toLocaleDateString()
    );
    const commitCounts = commits.map((_, index) => index + 1); // Simplemente usa un número creciente para contar los commits

    const ctx = document.getElementById("commitHistoryChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Commits",
            data: commitCounts,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    });
  };

  return (
    <div>
      <h1>Git Commit History</h1>
      <canvas id="commitHistoryChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CommitHistory;
