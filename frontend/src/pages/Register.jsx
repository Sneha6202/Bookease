import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    stallName: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/api/auth/register", form);
    alert(res.data);
    navigate("/login");
  } catch (error) {
    alert(error.response?.data || "Registration failed");
  }
};
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">BOOK-EASE REGISTER</h2>

            <form onSubmit={submitHandler}>
              <input
                className="form-control mb-3"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />

              <select
                className="form-select mb-3"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="BOOKSTALL">BOOKSTALL</option>
              </select>

              {form.role === "BOOKSTALL" && (
                <input
                  className="form-control mb-3"
                  name="stallName"
                  placeholder="Stall Name"
                  value={form.stallName}
                  onChange={handleChange}
                  required
                />
              )}

              <button className="btn btn-primary w-100" type="submit">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;