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
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api.base}/v1/device-list`);
      setDevices(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        "Failed to fetch device list. Try again later.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  const handleSync = async (deviceName, ipAddress) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${deviceName} (IP: ${ipAddress})`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Syncing...",
          text: "Please wait while data is being synced.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); // Show loading inside the modal
          },
        });

        try {
          const response = await axios.post(
            `${api.base}/v1/attendance-sync/`,
            {},
            { params: { ip_address: ipAddress } },
          );

          if (response.status === 200) {
            Swal.fire(
              "Sync Complete!",
              `${response.data.new_records_added} new records added.\n
              Device Records: ${response.data.total_device_records}\n
              Total Database Records: ${response.data.existing_records}`,
              "success",
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to sync data. Try again later.", "error");
        }
      }
    });
  };

  return (
    <Layout>
      <div className="container mt-4">
        {isLoading ? (
          <div className="has-text-centered">
            <button className="button is-loading is-large is-info">
              Loading devices...
            </button>
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
                    {card.location} - {card.ip_address}
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
