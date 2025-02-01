import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const ModifyDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await axios.get(`${api.base}/v1/device-manage/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch device data.");
      }
    };

    fetchDeviceData();
  }, [id]);

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
      await axios.put(`${api.base}/v1/device-manage/${id}`, formData);

      Swal.fire("Device updated successfully!", "", "success");
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("Failed to update device.");
      Swal.fire("Error!", "Failed to update device. Try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <div className="is-flex is-align-items-center mb-4">
              <button
                type="button"
                className="button is-ghost p-0 mr-3"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              <h2 className="title is-4">Update Device Info</h2>
            </div>
            {error && <div className="notification is-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Device Name */}
              <div className="field">
                <label className="label">Device Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="device_name"
                    value={formData.device_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* IP Address and Port */}
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">IP Address</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        name="ip_address"
                        value={formData.ip_address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Port</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
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
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="field is-flex is-justify-content-space-between is-align-items-center">
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
                    Update Device
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

export default ModifyDevice;
