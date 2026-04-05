import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function UserHome() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Ottapalam");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to load books.");
    }
  };

  const searchBooks = async () => {
    try {
      const res = await axios.get(
        `/api/books/search?title=${title}&location=${location}`
      );

      setBooks(res.data);

      if (res.data.length === 0) {
        setMessage("Book not available in this location.");
      } else {
        setMessage("");
      }
    } catch (error) {
      setMessage("Search failed.");
    }
  };

  const reserveBook = async (bookId, stockQuantity) => {
    if (stockQuantity <= 0) {
      alert("Currently unavailable.");
      return;
    }

    const loginData = JSON.parse(localStorage.getItem("login"));
    const customerId = loginData?.userId;

    if (!customerId) {
      alert("User not logged in properly. Please login again.");
      navigate("/login");
      return;
    }

    const pickupDate = prompt("Enter pickup date in YYYY-MM-DD format");
    if (!pickupDate) return;

    try {
      await axios.post("/api/reservations", {
        customerId: Number(customerId),
        bookId: bookId,
        quantity: 1,
        pickupDate: pickupDate,
      });

      alert("Book reserved successfully.");
      searchBooks();
    } catch (error) {
      alert(error.response?.data || "Reservation failed");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>BOOK-EASE</h3>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => navigate("/my-reservations")}
          >
            My Reservations
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
          <div className="col-md-2">
            <input className="form-control" value="Book" readOnly />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search book"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-outline-primary w-100" onClick={searchBooks}>
              Search
            </button>
          </div>
        </div>
      </div>

      {message && <div className="alert alert-warning">{message}</div>}

      {books.map((book) => (
        <div className="card p-3 mb-3" key={book.id}>
          <h5>{book.title}</h5>
          <p className="mb-1">Author: {book.author}</p>
          <p className="mb-1">Publication: {book.publication}</p>
          <p className="mb-1">Price: {book.price}</p>
          <p className="mb-1">Stock: {book.stockQuantity}</p>

          <div className="row align-items-center mt-2">
            <div className="col-md-3">
              <input className="form-control" value={book.location || ""} readOnly />
            </div>

            <div className="col-md-4">
              <button
                className={`btn ${book.stockQuantity > 0 ? "btn-outline-primary" : "btn-secondary"}`}
                disabled={book.stockQuantity <= 0}
                onClick={() => reserveBook(book.id, book.stockQuantity)}
              >
                {book.stockQuantity > 0 ? "Reserve Book" : "Currently unavailable"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserHome;