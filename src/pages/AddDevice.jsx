import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const AddDevice = () => {
  const [formData, setFormData] = useState({
    device_name: "",
    ip_address: "",
    port: "",
    serial_number: "",
    location: "",
    is_active: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${api.base}/v1/device-add`, formData);

      if (response.status === 201) {
        setFormData({
          device_name: "",
          ip_address: "",
          port: "",
          serial_number: "",
          location: "",
          is_active: false,
        });
        Swal.fire("Device added successfully!", "", "success");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add device. Please try again.");
    //   Swal.fire(
    //     "Error!",
    //     "There was an issue syncing the device data. Please try again later.",
    //     "error"
    //   );
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h2 className="title is-4 has-text-centered">Add New Device</h2>
            {error && <div className="notification is-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {/* Device Name */}
              <div className="field">
                <label className="label">Device Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter device name"
                    name="device_name"
                    value={formData.device_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* IP Address and Port - Two Columns */}
              <div className="columns">
                {/* IP Address */}
                <div className="column">
                  <div className="field">
                    <label className="label">IP Address</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter IP address"
                        name="ip_address"
                        value={formData.ip_address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Port */}
                <div className="column">
                  <div className="field">
                    <label className="label">Port</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        placeholder="Enter port"
                        name="port"
                        value={formData.port}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Serial Number */}
              <div className="field">
                <label className="label">Serial Number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter serial number"
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Active Status and Submit Button in the Same Row */}
              <div className="field is-flex is-justify-content-space-between is-align-items-center">
                {/* Active Status */}
                <div className="control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="ml-2">Active Status</span>
                </div>

                {/* Submit Button */}
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-primary ${
                      isSubmitting ? "is-loading" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Add Device
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddDevice;
