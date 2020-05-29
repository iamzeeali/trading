import React, { useState } from "react";
import Sidebar from "react-sidebar";
import SideBarContent from "./SideBarContent";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const [sidebarState, setSidebarState] = useState({
    sidebarOpen: false,
  });

  const { sidebarOpen } = sidebarState;

  const onSetSidebarOpen = (open) => {
    setSidebarState({ ...sidebarState, sidebarOpen: open });
  };

  return (
    <Sidebar
      sidebar={<SideBarContent />}
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "white",
          minWidth: "250px",
          padding: "20px",
          borderLeft: "4px solid #0275d8",
        },
      }}
    >
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <button
          className="btn btn-outline-primary "
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => onSetSidebarOpen(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="ml-auto">
          <i className="fa fa-home fa-2x px-2"></i>
        </Link>
      </nav>

      {props.children}
    </Sidebar>
  );
};

export default SideBar;
