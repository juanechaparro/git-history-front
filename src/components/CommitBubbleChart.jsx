import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { format } from "date-fns";

const CommitBubbleChart = () => {
  const [commits, setCommits] = useState([]);
  const chartRef = useRef(null); // Utilizamos un ref para almacenar la instancia del gráfico

  useEffect(() => {
    axios
      .get("http://localhost:3000/git")
      .then((response) => setCommits(response.data))
      .catch((error) => console.error(error));
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  useEffect(() => {
    if (commits.length > 0) {
      if (chartRef.current) {
        // Si ya existe un gráfico, lo destruimos antes de crear uno nuevo
        chartRef.current.destroy();
      }
      createBubbleChart();
    }
  }, [commits]);

  const createBubbleChart = () => {
    const bubbleData = commits.map((commit) => ({
      x: formatDate(commit.date), // Formateamos la fecha como string
      y: 1,
      r: commit.changes * 3, // Ajusta esta métrica según tus necesidades
      commit: commit.sha,
    }));

    const ctx = document
      .getElementById("commitBubbleChartCanvas")
      .getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [
          {
            data: bubbleData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            hoverBorderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            labels: bubbleData.map((item) => item.x), // Utilizamos las fechas como etiquetas en el eje x
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) =>
                `Commit: ${context.dataset.data[context.dataIndex].commit}`,
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <h1>Git Commit Bubble Chart</h1>
      <div style={{ width: "800px", margin: "0 auto" }}>
        <canvas id="commitBubbleChartCanvas" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default CommitBubbleChart;
