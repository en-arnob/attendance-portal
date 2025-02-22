import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const AttendanceStatus = () => {
  // const navigate = useNavigate();

  return (
    <div className="container mt-2 p-2">
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <div
            className="box has-background-success has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaCheckCircle size={24} />
            <p className="title is-6 has-text-white">Present: 12</p>
            {/* <p className="subtitle is-5 has-text-white">12</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-warning has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaClock size={24} />
            <p className="title is-6 has-text-white">Late: 5</p>
            {/* <p className="subtitle is-5 has-text-white">5</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-link has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaExclamationCircle size={24} />
            <p className="title is-6 has-text-white">Not Punched: 3</p>
            {/* <p className="subtitle is-5 has-text-white">3</p> */}
          </div>
        </div>
        <div className="column is-one-quarter">
          <div
            className="box has-background-danger has-text-white has-text-centered"
            style={{ height: "80px" }}
          >
            <FaTimesCircle size={24} />
            <p className="title is-6 has-text-white">Absent: 8</p>
            {/* <p className="subtitle is-5 has-text-white">8</p> */}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AttendanceStatus;
