import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      setLoading(false);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );

      if (response.status === 200) {
        enqueueSnackbar("User Logged in Successfully", { variant: "success" });
        navigate("/viewallpost");
      } else if (response.status === 401) {
        enqueueSnackbar("Invalid UserName or Password", { variant: "warning" });
      } else {
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("An error occurred. Please check the console.", {
        variant: "error",
      });
      console.log(error);
    }
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are Home of Movies</h4>
                    </div>

                    {loading && (
                      <div className="text-color-red">
                        Loading........................
                      </div>
                    )}

                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          User Mail:
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Phone number or email address"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 text-black"
                          type="button"
                          onClick={handleLogin}
                        >
                          Log in
                        </button>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4 text-black">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/userRegister">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Welcome to the Home of Movies</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
