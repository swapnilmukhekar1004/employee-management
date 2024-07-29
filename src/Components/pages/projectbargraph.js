import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const ProjectBarGraph = ({ projects }) => {
  const chartRef = useRef(null); // Reference to the chart instance
  const [chartInstance, setChartInstance] = useState(null);

  // Initialize an object to store the count of projects department-wise
  const projectCounts = {};

  // Count the number of projects department-wise
  projects.forEach((project) => {
    if (projectCounts[project.department]) {
      projectCounts[project.department]++;
    } else {
      projectCounts[project.department] = 1;
    }
  });

  // Extract the department names and project counts for chart data
  const departmentNames = Object.keys(projectCounts);
  const projectData = Object.values(projectCounts);

  // Data for the chart
  const data = {
    labels: departmentNames,
    datasets: [
      {
        label: "Total Projects",
        data: projectData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Destroy the previous chart instance before rendering a new one
  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // Update the chart instance when the component mounts or when projects change
  useEffect(() => {
    if (chartRef.current) {
      const newChartInstance = chartRef.current.chartInstance;
      setChartInstance(newChartInstance);
    }
  }, [projects]);

  return (
    <div>
      <h2>Total Projects Department-wise</h2>
      <Bar
        ref={chartRef}
        data={data}
        options={{
          scales: {
            y: {
              type: "linear", // Specify the scale type
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ProjectBarGraph;
