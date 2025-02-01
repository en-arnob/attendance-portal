import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { FaClock, FaEdit, FaPowerOff, FaUsers } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import {  MdOutlineCleaningServices } from "react-icons/md";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const ManageDevices = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeviceList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api.base}/v1/device-list`);
      setDevices(response.data);
      setError(null); //
    } catch (error) {
      console.error(error);
      setError("Failed to fetch device list. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
                  style={{ borderRadius: "8px", padding: "1rem" }}
                >
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
                      <button className="button is-black is-small is-fullwidth">
                        <FaClock />
                        <span className="ml-1">Time Sync</span>
                      </button>
                    </div>
                    <div
                      className="column is-half"
                      style={{ marginLeft: "2.5px" }}
                    >
                      <button className="button is-black is-small is-fullwidth">
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
                      <button className="button is-black is-small is-fullwidth">
                        <AiTwotoneDelete className="has-text-danger" />
                        <span className="ml-1">Delete Device</span>
                      </button>
                    </div>
                    <div
                      className="column is-half"
                      style={{ marginLeft: "2.5px" }}
                    >
                      <button className="button is-black is-small is-fullwidth">
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
                      <button className="button is-black is-small is-fullwidth">
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
