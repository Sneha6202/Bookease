import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post("/api/auth/login", userData);

      const role = res.data.role;
      const token = res.data.accessToken;
      const email = res.data.email;
      const userId = res.data.userId;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem(
        "login",
        JSON.stringify({
          login: "true",
          token: token,
          role: role,
          user: email,
          userId: userId,
        })
      );

      if (role === "CUSTOMER") {
        navigate("/user-home");
      } else {
        navigate("/stall-home");
      }
    } catch (error) {
      setErrorMessage("Wrong Username or Password");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">BOOK-EASE LOGIN</h2>

            <form onSubmit={loginHandler}>
              <label htmlFor="username" className="mb-2">Email</label>
              <input
                className="form-control mb-3"
                type="email"
                placeholder="email"
                ref={emailRef}
                id="username"
                required
              />

              <label htmlFor="password" className="mb-2">Password</label>
              <input
                className="form-control mb-3"
                type="password"
                placeholder="password"
                ref={passwordRef}
                id="password"
                required
              />

              <button className="btn btn-outline-primary w-100" type="submit">
                Login
              </button>
            </form>

            <span className="text-danger mt-3 d-block text-center">
              {errorMessage}
            </span>

            <p className="text-center mt-3">
              New user? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;