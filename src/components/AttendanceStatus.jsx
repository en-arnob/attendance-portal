import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const AttendanceStatus = () => {
  // const navigate = useNavigate();
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const getAttStatus = async () => {
    try {
      const response = await axios.get(`${api.base}/v1/attendance-summary`);
      const result = response.data.reduce((acc, item) => {
        acc[item.xstatus] = item.count;
        return acc;
      }, {});
      setAttendanceStatus(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttStatus();
  }, []);

  return (
    <div className="container mt-2 p-2">
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <div
            className="box has-background-success has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaCheckCircle size={24} />
            <p className="title is-6 has-text-white">
              Present: {attendanceStatus.P}
            </p>
            {/* <p className="subtitle is-5 has-text-white">12</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-warning has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaClock size={24} />
            <p className="title is-6 has-text-white">
              Late: {attendanceStatus.L}
            </p>
            {/* <p className="subtitle is-5 has-text-white">5</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-link has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaExclamationCircle size={24} />
            <p className="title is-6 has-text-white">
              Not Punched: {attendanceStatus.NP}
            </p>
            {/* <p className="subtitle is-5 has-text-white">3</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-danger has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaTimesCircle size={24} />
            <p className="title is-6 has-text-white">
              Absent: {attendanceStatus.A}
            </p>
            {/* <p className="subtitle is-5 has-text-white">8</p> */}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AttendanceStatus;
