import React from "react";
import {useLocation } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const pathName = location.pathname;

  // Function to convert pathname to breadcrumb text
  const getBreadcrumbText = (pathname) => {
    // Remove leading slash and split the pathname into an array of segments
    const segments = pathname.substring(1).split("/");
    
    // Capitalize the first letter of each segment and join them with space
    return segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
  };

  // Function to get the breadcrumb text based on the current location
  const renderBreadcrumbText = () => {
    if (pathName === "/") {
      return "Employee-List";
    } else {
      return getBreadcrumbText(pathName);
    }
  };

  return (
    <>
      <nav className="desktopNav">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginTop: "6%" }}
            >
              <h5 className="text-white"> <span style={{marginLeft:"18px"}}>{renderBreadcrumbText()}</span></h5>

              <img src="img/Logo.svg" alt="logo"></img>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
