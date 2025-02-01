import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DeviceSync from "./pages/DeviceSync";
import "bulma/css/bulma.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDevice from "./pages/AddDevice";
import ManageDevices from "./pages/ManageDevices";
import ModifyDevice from "./pages/ModifyDevice";

function App() {
  return (
    <div
      className="has-background-black-ter has-text-light"
      style={{ minHeight: "100vh" }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sync"
            element={
              <ProtectedRoute>
                <DeviceSync />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-device"
            element={
              <ProtectedRoute>
                <AddDevice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-devices"
            element={
              <ProtectedRoute>
                <ManageDevices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modify-device/:id"
            element={
              <ProtectedRoute>
                <ModifyDevice />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
