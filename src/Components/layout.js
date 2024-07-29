import React from "react";
import Sidebar from "./common/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./common/header";
import MobileNav from "./common/mobileNav";
import BottomNav from "./common/bottomNav";

export default function Layout() {
  return (
    <>
      <div className="Layout">
        <MobileNav />
        <div className="container-fluid ps-0 pe-0 overflow-hidden">
          <div className="row">
            <div>
              <Sidebar />
            </div>
            <div className="OutletSection">
              <div className="CommonPageLayout">
                <div className="container-fluid">
                  <Header />

                  <Outlet />
                </div>
              </div>
            </div>
            <div className="BottomNavigation">
              <BottomNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
