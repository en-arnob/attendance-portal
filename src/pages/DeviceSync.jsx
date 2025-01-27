/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const DeviceSync = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for device list
  const [error, setError] = useState(null); // Optional: handle errors

  const getDeviceList = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`${api.base}/v1/device-list`);
      setDevices(response.data);
      setError(null); // Reset any previous error
    } catch (error) {
      console.error(error);
      setError("Failed to fetch device list. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  const handleSync = async (deviceName, ipAddress) => {
    console.log(ipAddress);
    Swal.fire({
      title: "Are you sure you want to sync?",
      text: `${deviceName} (IP: ${ipAddress})`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${api.base}/v1/attendance-sync/`, // The endpoint URL
            {}, // Empty body if not needed
            { params: { ip_address: ipAddress } } // Query parameters
          );
          console.log(response);
          if (response.status == 200) {
            Swal.fire(
              "Saved!",
              `${response.data.new_records_added} new records added to database, Devcice Records: ${response.data.total_device_records}, Total Database Records: ${response.data.existing_records}`,
              "success"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "There was an issue syncing the device data. Please try again later.",
            "error"
          );
        }
      }
    });
  };

  return (
    <Layout>
      <div className="container mt-4">
        {isLoading ? ( // Show loading spinner while fetching
          <div className="has-text-centered">
            <button className="button is-loading is-large is-info">
              Loading devices...
            </button>
          </div>
        ) : error ? ( // Show error message if fetching fails
          <div className="notification is-danger is-light has-text-centered">
            {error}
          </div>
        ) : (
          <div className="columns is-multiline">
            {devices.map((card, index) => (
              <div key={index} className="column is-one-quarter">
                <div
                  className="box has-shadow has-background-dark has-text-white"
                  style={{ borderRadius: "8px" }}
                >
                  <h2 className="title is-5 has-text-white">
                    {card.device_name}
                  </h2>
                  <p className="content has-text-grey-lighter">
                    {card.ip_address}
                  </p>
                  <button
                    onClick={() =>
                      handleSync(card.device_name, card.ip_address)
                    }
                    className="button is-info is-fullwidth"
                  >
                    Sync Data
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeviceSync;
