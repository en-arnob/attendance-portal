import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { FaClock, FaEdit, FaPowerOff, FaUsers } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineCleaningServices } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const ManageDevices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeviceList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api.base}/v1/device-list`);
      setDevices(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch device list. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const methodTimeSync = async (ipAddress) => {
    Swal.fire({
      title: "Are you sure?",
      text: `IP: ${ipAddress}`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Syncing...",
          text: "Please wait while time is being synced.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post(
            `${api.base}/v1/device-time-Sync/`,
            {},
            { params: { ip_address: ipAddress } },
          );

          if (response.status === 200) {
            Swal.fire("Time synchronized!", ``, "success");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to sync time. Try again later.", "error");
        }
      }
    });
  };

  const methodDelDevice = async (id, deviceName, ipAddress) => {
    Swal.fire({
      title: "Are you sure you want to delete this device?",
      text: `${deviceName} (IP: ${ipAddress})`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while device being deleted.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.delete(
            `${api.base}/v1/device-manage/${id}`,
          );

          if (response.status === 204) {
            Swal.fire("Device deleted!", ``, "success");
            getDeviceList();
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "Failed to delete device. Try again later.",
            "error",
          );
        }
      }
    });
  };

  const methodWipeDevice = async (deviceName, ipAddress) => {
    Swal.fire({
      title: "Are you sure you want to wipe this device data?",
      text: `${deviceName} (IP: ${ipAddress})`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Wiping...",
          text: "Please wait while device data being wiped.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post(
            `${api.base}/v1/clear_device_attendance/`,
            {},
            { params: { ip_address: ipAddress } }
          );

          if (response.status === 200) {
            Swal.fire("Device data wiped!", ``, "success");
            getDeviceList();
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "Failed to wipe device data. Try again later.",
            "error",
          );
        }
      }
    });
  };

  const methodPowerOff = async (deviceName, ipAddress) => {
    Swal.fire({
      title: "Are you sure you want to power off this device?",
      text: `${deviceName} (IP: ${ipAddress})`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Turning off...",
          text: "Please wait while device being switched off.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post(
            `${api.base}/v1/power_off_device/`,
            {},
            { params: { ip_address: ipAddress } },
          );

          if (response.status === 200) {
            Swal.fire("Device turned off!", ``, "success");
            getDeviceList();
          console.log("yoor password is ok");
            
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "Failed to turn off the device. Try again later.",
            "error",
          );
        }
      }
    });
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="title is-4 has-text-centered has-text-grey-lighter pb-2">
          Device Management
        </h2>
        {isLoading ? (
          <div className="has-text-centered">
            <button className="button is-loading is-large is-info">
              Loading devices...
            </button>
          </div>
        ) : error ? (
          <div className="notification is-danger is-light has-text-centered">
            {error}
          </div>
        ) : (
          <div className="columns is-multiline">
            {devices.map((card, index) => (
              <div key={index} className="column is-one-quarter">
                <div
                  className="box has-shadow has-background-dark has-text-white"
                  style={{
                    borderRadius: "8px",
                    padding: "1rem",
                    position: "relative",
                  }}
                >
                  {/* Active Status Indicator */}
                  {card.is_active && (
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                      }}
                    ></span>
                  )}

                  <h2 className="subtitle is-5 has-text-white">
                    {card.device_name}
                  </h2>
                  <p className="content has-text-grey-lighter">
                    {card.location} -{" "}
                    <span className="has-text-info">{card.ip_address}</span>
                  </p>

                  {/* First Row of Buttons */}
                  <div
                    className="columns is-gapless"
                    style={{ marginBottom: "5px" }}
                  >
                    <div
                      className="column is-half"
                      style={{ marginRight: "2.5px" }}
                    >
                      <button
                        onClick={() => methodTimeSync(card.ip_address)}
                        className="button is-black is-small is-fullwidth"
                      >
                        <FaClock />
                        <span className="ml-1">Time Sync</span>
                      </button>
                    </div>
                    <div
                      className="column is-half"
                      style={{ marginLeft: "2.5px" }}
                    >
                      <button
                        onClick={() => navigate(`/modify-device/${card.id}`)}
                        className="button is-black is-small is-fullwidth"
                      >
                        <FaEdit className="has-text-primary" />
                        <span className="ml-1">Update Info</span>
                      </button>
                    </div>
                  </div>

                  {/* Second Row of Buttons */}
                  <div
                    className="columns is-gapless"
                    style={{ marginBottom: "5px" }}
                  >
                    <div
                      className="column is-half"
                      style={{ marginRight: "2.5px" }}
                    >
                      <button
                        onClick={() =>
                          methodDelDevice(
                            card.id,
                            card.device_name,
                            card.ip_address,
                          )
                        }
                        className="button is-black is-small is-fullwidth"
                      >
                        <AiTwotoneDelete className="has-text-danger" />
                        <span className="ml-1">Delete Device</span>
                      </button>
                    </div>
                    <div
                      className="column is-half"
                      style={{ marginLeft: "2.5px" }}
                    >
                      <button
                        onClick={() =>
                          methodWipeDevice(card.device_name, card.ip_address)
                        }
                        className="button is-black is-small is-fullwidth"
                      >
                        <MdOutlineCleaningServices className="has-text-white" />
                        <span className="ml-1">Wipe Data</span>
                      </button>
                    </div>
                  </div>

                  {/* Third Row of Buttons */}
                  <div
                    className="columns is-gapless"
                    style={{ marginBottom: "5px" }}
                  >
                    <div
                      className="column is-half"
                      style={{ marginRight: "2.5px" }}
                    >
                      <button
                        onClick={() =>
                          methodPowerOff(card.device_name, card.ip_address)
                        }
                        className="button is-black is-small is-fullwidth"
                      >
                        <FaPowerOff className="has-text-danger" />
                        <span className="ml-1">Power Off</span>
                      </button>
                    </div>
                    <div
                      className="column is-half"
                      style={{ marginLeft: "2.5px" }}
                    >
                      <button className="button is-black is-small is-fullwidth">
                        <FaUsers className="has-text-info" />
                        <span className="ml-1">Show Users</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageDevices;
