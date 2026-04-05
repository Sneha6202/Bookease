import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function StallReservations() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getStallId = () => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    return loginData?.userId;
  };

  const loadReservations = async () => {
    const stallId = getStallId();

    if (!stallId) {
      alert("User not logged in properly. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`/api/reservations/stall/${stallId}`);
      setReservations(res.data);
    } catch (error) {
      alert("Failed to load reservations");
    }
  };

  const completeReservation = async (id) => {
    try {
      await axios.put(`/api/reservations/complete/${id}`);
      alert("Reservation completed successfully.");
      loadReservations();
    } catch (error) {
      alert("Complete failed");
    }
  };

  const filteredReservations = reservations.filter((r) =>
    r.book?.title?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>BOOK-EASE</h3>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => navigate("/stall-home")}
          >
            STOCK
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              localStorage.removeItem("login");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Search by book title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-outline-primary w-100" onClick={loadReservations}>
              Search
            </button>
          </div>
        </div>
      </div>

      {filteredReservations.length === 0 && (
        <div className="alert alert-info">No reservations found.</div>
      )}

      {filteredReservations.map((item) => (
        <div className="card p-3 mb-3" key={item.id}>
          <h4>{item.book?.title}</h4>
          <p className="mb-0">Customer Email: {item.customer?.email}</p>
          <p className="mb-0">Pickup Date: {item.pickupDate}</p>
          <p className="mb-0">Reservation Date: {item.reservationDate}</p>
          <p className="mb-2">Status: {item.status}</p>

          {item.status !== "COMPLETED" && item.status !== "CANCELLED" && (
            <button
              className="btn btn-outline-secondary btn-sm w-auto"
              onClick={() => completeReservation(item.id)}
            >
              COMPLETE
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default StallReservations;