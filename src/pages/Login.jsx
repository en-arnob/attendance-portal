import { useState,  } from "react";
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); 
  const { methodSignin } = useData();
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signinData.username || !signinData.password) { 
      setError("Please fill in all fields.");
      return;
    }
    try {
      await methodSignin(signinData);
      setError(null);
      // Navigate to the dashboard or another page after login
       navigate("/");
    } catch (err) {
      console.log(err);
      
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="columns is-centered">
        <div className="column is-half">
          <section className="hero is-info">
            <div className="hero-body">
              <p className="title">Attendance Portal</p>
              <p className="subtitle">v1.0</p>
            </div>
          </section>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    name="username"
                    value={signinData.username}
                    onChange={handleChange}
                    className="input is-medium has-background-black-ter has-text-white"
                    type="text"
                    placeholder="Username"
                  />
                  <span className="icon is-medium is-left">
                    <FaRegUser />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    name="password"
                    value={signinData.password}
                    onChange={handleChange}
                    className="input is-medium has-background-black-ter has-text-white"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="icon is-medium is-left">
                    <TbLockPassword />
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="button is-link is-fullwidth is-medium"
              >
                Login
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
