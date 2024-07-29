import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
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
      return "Dashboard";
    } else {
      return getBreadcrumbText(pathName);
    }
  };



  return (
    <>
      {/* mobile navbar start here */}
      <nav className="MobileNav">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center WrapSection">
            <div>
              <h5 className="text-white" style={{fontSize:"18px", marginBottom:"0px"}}> {<FaAngleLeft  />} <span style={{marginLeft:"18px"}}>{renderBreadcrumbText()}</span></h5>
            </div>

           
          </div>
        </div>
      </nav>
    </>
  );
}
