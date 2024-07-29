import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmpDetails() {
  const [projects, setProjects] = useState([]);
  const [closeProjectsCount, setCloseProjectsCount] = useState(0);
  const [runningProjectsCount, setrunningProjectsCount] = useState(0);
  const [cancelledProjectsCount, setcancelledProjectsCount] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project");
      const projects = response.data;

      //project total count
      setProjects(projects);

      // Filter projects with status 'close'
      const closeProjects = projects.filter(
        (project) => project.status === "closed"
      );
      // Update state with the count of close projects
      setCloseProjectsCount(closeProjects.length);

      // Filter projects with status 'running'
      const runningProjects = projects.filter(
        (project) => project.status === "running"
      );
      // Update state with the count of running projects
      setrunningProjectsCount(runningProjects.length);

      // Filter projects with status 'cancelled'
      const cancelledProjects = projects.filter(
        (project) => project.status === "cancelled"
      );
      // Update state with the count of cancelled projects
      setcancelledProjectsCount(cancelledProjects.length);

      //graph
      // Create an object to store department-wise data
      const departmentMap = {};
      projects.forEach((project) => {
        const department = project.department;
        if (!departmentMap[department]) {
          departmentMap[department] = { total: 0, closed: 0 };
        }
        departmentMap[department].total++;
        if (project.status === "closed") {
          departmentMap[department].closed++;
        }
      });

      // Convert department-wise data to array for easier rendering
      const departmentArray = Object.entries(departmentMap).map(
        ([department, data]) => ({
          department,
          total: data.total,
          closed: data.closed,
        })
      );

      // Update state with department-wise data
      setDepartmentData(departmentArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Calculate the total count of projects
  const totalCount = projects.length;




  return (
    <>
      <div>
        <div>
          <div className="MainContent">
            <div className="row DashobarCustomRow">
              <div className="col-lg-3 custom-col">
                <div className="card DCard ">
                  <div className="card-body card-shadow ">
                    <p>Total Projects</p>
                    <h2>{totalCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 custom-col">
                <div className="card DCard">
                  <div className="card card-shadow">
                    <div className="card-body ">
                      <p>Closed</p>
                      <h2>{closeProjectsCount}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 custom-col">
                <div className="card DCard">
                  <div className="card card-shadow">
                    <div className="card-body ">
                      <p>Running</p>
                      <h2>{runningProjectsCount}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 custom-col">
                <div className="card DCard">
                  <div className="card card-shadow">
                    <div className="card-body ">
                      <p>Clouser Delay</p>
                      <h2>8</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 custom-col">
                <div className="card DCard">
                  <div className="card card-shadow">
                    <div className="card-body ">
                      <p>Cancelled</p>
                      <h2>{cancelledProjectsCount}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              <p className="departmentWiseName">
                Department wise - Total Vs Closed
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card mb-2 chartCard BarChartCard">
                    <div className="card-body">
                     

                      <div>
                        <div className="d-flex justify-content-center graph-detail-section">
                          <div className="ms-4 me-4 blue-mark">
                            <span>total</span>
                          </div>
                          <div className="ms-4 me-4 green-mark">
                            <span>closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card  chartCard PieChartsCard">
                    <div className="card-body">
                

                      {/* <div>
                        <div className="d-flex justify-content-center graph-detail-section">
                          <div className="ms-4 me-4 blue-mark">
                            <span>total</span>
                          </div>
                          <div className="ms-4 me-4 green-mark">
                            <span>closed</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
