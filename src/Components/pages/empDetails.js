import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EmpDetails() {
  const [deskDetails, setDeskDetails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("Location State:", location.state); // Debugging
    if (location.state) {
      setDeskDetails([location.state]);
    }
  }, [location.state]);

  return (
    <div>
      <div className="row mt-4">
        <div className="col-lg-12">
          <p className="departmentWiseName">
            Department wise - Total Vs Closed
          </p>
          <div className="row">
            <div className="col-lg-6">
              <div>
                {deskDetails.length > 0 ? (
                  deskDetails.map((item) => (
                    <div className="mb-3 text-capitalize mt-5" key={item.id}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="NameText" style={{ fontSize: "16px" }}>
                            ID: {item.id || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 InformSection">
                        <p>
                          <span className="GreyText">
                            Name:
                            <span className="DarkText ms-1">{item.name || "N/A"}</span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            Email:
                            <span className="DarkText ms-1">
                              {item.emailId || "N/A"}
                            </span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            Mobile No:
                            <span className="DarkText ms-1">{item.mobile || "N/A"}</span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            Country:
                            <span className="DarkText ms-1">
                              {item.country || "N/A"}
                            </span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            State:
                            <span className="DarkText ms-1">{item.state || "N/A"}</span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            District:
                            <span className="DarkText ms-1">
                              {item.district || "N/A"}
                            </span>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            Created At:
                            <span className="DarkText ms-1">
                              {item.createdAt || "N/A"}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No details available.</p>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card chartCard PieChartsCard">
                <div className="card-body">
                  {/* Add your chart or additional content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
