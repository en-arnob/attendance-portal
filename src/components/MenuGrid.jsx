import React from "react";
import { FaSync, FaPlus, FaWifi, FaFingerprint } from "react-icons/fa";
import Swal from "sweetalert2";

const MenuGrid = () => {
  const handleSync = (action) => {
    Swal.fire({
      title: "Are you sure you want to sync data?",
      text: " This can't be undone!",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          "Saved!",
          "Device data has been successfully synced to the database.",
          "success"
        );
      }
    });
  };

  return (
    <div className="container mt-2 p-2">
      <div className="columns is-multiline is-centered">
        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            onClick={() => handleSync("Synchronize Data")}
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
            // onClick={() => handleCardClick("Manage Device")}
          >
            <div className="card-content">
              <span className="icon is-large mb-3">
                <FaFingerprint size={32} className="has-text-info" />
              </span>
              <p className="is-size-5">Manage Device</p>
            </div>
          </div>
        </div>

        <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
          <div
            className="card notification has-background-dark has-text-white is-clickable has-text-centered"
            style={{ height: "150px" }}
            // onClick={() => handleCardClick("Add Device")}
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
