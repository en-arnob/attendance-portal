import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "bulma/css/bulma.min.css";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "react-lottie";
import noDLottie from "../assets/lotties/noData.json";
// import loadingLottie from "../assets/lotties/loading.json";
import { FaSearch } from "react-icons/fa";
const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const ViewAttendance = () => {
  const noDAnimation = {
    loop: true, // Animation will loop
    autoplay: true, // Animation will autoplay
    animationData: noDLottie, // The animation JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // You can adjust the aspect ratio here
    },
  };
  //   const loadingAnimation = {
  //     loop: true, // Animation will loop
  //     autoplay: true, // Animation will autoplay
  //     animationData: loadingLottie, // The animation JSON file
  //     rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice", // You can adjust the aspect ratio here
  //     },
  //   };

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [deptList, setDeptList] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [attData, setAttData] = useState([]);
  const [pageInfo, setPageInfo] = useState(0);
  const [dNextUrl, setDNextUrl] = useState(null);
  const [dPrevUrl, setDPrevUrl] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(format(date, "yyyy-MM-dd"));
    setAttData([]);
  };
  const handleEndDateChange = (date) => {
    setEndDate(format(date, "yyyy-MM-dd"));
    setAttData([]);
  };

  const getAttData = async () => {
    try {
      // console.log(startDate, endDate);
      const response = await axios.get(
        `${api.base}/v1/get-attendance?start_date=${startDate}&end_date=${endDate}&xdept=${selectedDept}&xlocation=${selectedLocation}`,
      );
      const data = response.data;
      // console.log(data.results);

      setAttData(data.results);
      setPageInfo(data.pagination_info);
      setDNextUrl(data.next);
      setDPrevUrl(data.previous);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getDeptList = async () => {
    try {
      const response = await axios.get(
        `${api.base}/v1/setup-data/all?xtype=Department`
      );
      setDeptList(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getDeptList();
  }, [])
  
  const getPaginationData = async (url) => {
    try {
      console.log(startDate, endDate);
      const response = await axios.get(url);
      const data = response.data;
      //   console.log(data.results);
      setAttData(data.results);
      setPageInfo(data.pagination_info);
      setDNextUrl(data.next);
      setDPrevUrl(data.previous);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = () => {
    setIsLoading(true);
    getAttData();
  };
  const onPrev = () => {
    setIsLoading(true);
    getPaginationData(dPrevUrl);
  };
  const onNext = () => {
    setIsLoading(true);
    getPaginationData(dNextUrl);
  };

  return (
    <Layout>
      <div className=" m-4">
        <h2 className="title is-4 has-text-centered has-text-grey-lighter pb-2">
          Attendance Data
        </h2>
      </div>
      {/* Filters */}
      <div className="filters">
        <div className="field is-grouped">
          {/* Start Date */}
          <div className="control">
            <label className="label has-text-white">Start Date</label>
            <div className="input-container">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy-MM-dd"
                className="input datepicker-input"
                placeholderText="Select Start Date"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="control">
            <label className="label has-text-white">End Date</label>
            <div className="input-container">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy-MM-dd"
                className="input datepicker-input"
                placeholderText="Select End Date"
              />
            </div>
          </div>
          <div className="control">
            <label className="label has-text-white">Department</label>
            <div className="input-container">
              <div className="select">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">All dept.</option>
                  {deptList.map((dept) => (
                    <option key={dept.xcode} value={dept.xcode}>
                      {dept.xcode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="control">
            <label className="label has-text-white">Location</label>
            <div className="input-container">
              <div className="select">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">No filter</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Factory">Factory</option>
                  
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="control mt-2">
            <button className="button is-primary mt-5" onClick={onSearch}>
              <FaSearch className="mx-2" /> Find
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      {!isLoading && attData.length > 0 ? (
        <div className=" mt-4">
          {/* Table */}
          <table className="table is-hoverable is-fullwidth has-background-dark">
            <thead className="has-background-success">
              <tr>
                <th className="has-text-white">ID</th>
                <th className="has-text-white">Name</th>
                <th className="has-text-white">Designation</th>
                <th className="has-text-white">Department</th>
                <th className="has-text-white">Shift</th>
                <th style={{ width: "110px" }} className="has-text-white">
                  Date
                </th>
                <th className="has-text-white">InTime</th>
                <th className="has-text-white">OutTime</th>
                <th className="has-text-white">Remarks</th>
                <th className="has-text-white">Status</th>{" "}
              </tr>
            </thead>
            <tbody>
              {attData.map((data) => (
                <tr key={data.xemp} className="has-background-grey-darker">
                  <td className="has-text-white">{data.xemp}</td>
                  <td className="has-text-white">{data.xname}</td>
                  <td className="has-text-white">{data.xdesig}</td>
                  <td className="has-text-white">{data.xdept}</td>
                  <td className="has-text-white">{data.xshift}</td>
                  <td className="has-text-white">{data.xdate}</td>
                  <td className="has-text-white">
                    {data.xintime?.split("T")[1]}
                  </td>
                  <td className="has-text-white">
                    {data.xouttime?.split("T")[1]}
                  </td>
                  <td className="has-text-white">{data.xremark}</td>
                  <td
                    className={`has-text-centered ${
                      data.xstatus === "NP"
                        ? "has-background-warning-dark has-text-white"
                        : data.xstatus === "L"
                        ? "has-background-warning has-text-black"
                        : data.xstatus === "A"
                        ? "has-background-danger has-text-white"
                        : data.xstatus === "P"
                        ? "has-background-success has-text-white"
                        : "has-text-white"
                    }`}
                  >
                    {data.xstatus}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination and Record Count */}
          <div className="columns is-mobile is-centered">
            <div className="column is-narrow">
              <nav
                className="pagination is-centered"
                role="navigation"
                aria-label="pagination"
              >
                <button
                  onClick={onPrev}
                  className={`pagination-previous has-text-white ${
                    dPrevUrl === null ? "is-disabled" : ""
                  }`}
                  disabled={dPrevUrl === null}
                >
                  <GrFormPrevious /> Previous
                </button>
                <button
                  onClick={onNext}
                  className={`pagination-next has-text-white ${
                    dNextUrl === null ? "is-disabled" : ""
                  }`}
                  disabled={dNextUrl === null}
                >
                  <GrFormNext /> Next
                </button>
              </nav>
            </div>
            <div className="column is-narrow">
              <p className="has-text-centered mt-2">{pageInfo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="loader-wrapper ">
              <div className="loader is-loading"></div>
            </div>
          ) : (
            // <Lottie options={loadingAnimation} height={400} width={400} />
            <Lottie options={noDAnimation} height={400} width={400} />
          )}
        </div>
      )}
    </Layout>
  );
};

export default ViewAttendance;
