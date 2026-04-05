import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const getCustomerId = () => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    return loginData?.userId;
  };

  const loadReservations = async () => {
    const customerId = getCustomerId();

    if (!customerId) {
      alert("User not logged in properly. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`/api/reservations/customer/${customerId}`);
      setReservations(res.data);
    } catch (error) {
      alert("Could not load reservations");
    }
  };

  const cancelReservation = async (id) => {
    try {
      await axios.put(`/api/reservations/cancel/${id}`);
      alert("Reservation cancelled successfully.");
      loadReservations();
    } catch (error) {
      alert("Cancel failed");
    }
  };

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
            onClick={() => navigate("/user-home")}
          >
            HOME
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
        <h5 className="mb-0">My Reservations</h5>
      </div>

      {reservations.length === 0 && (
        <div className="alert alert-info">No reservations found.</div>
      )}

      {reservations.map((item) => (
        <div className="card p-3 mb-3" key={item.id}>
          <h4>{item.book?.title}</h4>
          <p className="mb-0">{item.book?.author}</p>
          <p className="mb-0">{item.book?.stall?.stallName}</p>
          <p className="mb-0">{item.book?.location}</p>
          <p className="mb-0">Price: {item.book?.price}</p>
          <p className="mb-0">Pickup Date: {item.pickupDate}</p>
          <p>Status: {item.status}</p>

          {item.status !== "CANCELLED" && item.status !== "COMPLETED" && (
            <button
              className="btn btn-danger btn-sm w-auto"
              onClick={() => cancelReservation(item.id)}
            >
              CANCEL RESERVATION
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyReservations;