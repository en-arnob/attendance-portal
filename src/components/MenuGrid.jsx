import React from "react";
import { FaSync, FaPlus, FaWifi, FaFingerprint } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const MenuGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-2 p-2">
      <div className="columns is-multiline is-centered">
        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            onClick={() => navigate("/sync")}
          >
            <div className="card-content">
              <span className="icon is-large mb-3">
                <FaSync size={32} className="has-text-info" />
              </span>
              <p className="is-size-5">Synchronize Data</p>
            </div>
          </div>
        </div>
        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            onClick={() => navigate("/add-device")}
          >
            <div className="card-content">
              <span className="icon is-large mb-3">
                <FaPlus size={32} className="has-text-info" />
              </span>
              <p className="is-size-5">Add Device</p>
            </div>
          </div>
        </div>

        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            onClick={() => navigate("/manage-devices")}
          >
            <div className="card-content">
              <span className="icon is-large mb-3">
                <FaFingerprint size={32} className="has-text-info" />
              </span>
              <p className="is-size-5">Manage Devices</p>
            </div>
          </div>
        </div>

        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            // onClick={() => handleCardClick("Synchronize Device")}
          >
            <div className="card-content">
              <span className="icon is-large mb-3">
                <FaWifi size={32} className="has-text-info" />
              </span>
              <p className="is-size-5">View Attendance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuGrid;
