import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function StockPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    publication: "",
    price: "",
    stockQuantity: "",
    location: "",
  });

  const navigate = useNavigate();

  const getStallId = () => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    return loginData?.userId;
  };

  const loadBooks = async () => {
    const stallId = getStallId();

    if (!stallId) {
      alert("User not logged in properly. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`/api/books/stall/${stallId}`);
      setBooks(res.data);
    } catch (error) {
      alert("Failed to load stock");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();

    const stallId = getStallId();

    if (!stallId) {
      alert("User not logged in properly. Please login again.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`/api/books/stall/${stallId}`, {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      });

      alert("Stock added successfully.");

      setForm({
        title: "",
        author: "",
        publication: "",
        price: "",
        stockQuantity: "",
        location: "",
      });

      loadBooks();
    } catch (error) {
      alert("Failed to add stock");
    }
  };

  const updateBook = async (book) => {
    const newStock = prompt("Enter updated stock", book.stockQuantity);
    if (newStock === null) return;

    try {
      await axios.put(`/api/books/${book.id}`, {
        ...book,
        stockQuantity: Number(newStock),
      });

      alert("Stock updated successfully.");
      loadBooks();
    } catch (error) {
      alert("Update failed");
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>BOOK-EASE</h3>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => navigate("/stall-reservations")}
          >
            RESERVATIONS
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
        <div className="row g-2 mb-3">
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Search stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <h6 className="mb-3 text-primary">+ Add A New Stock</h6>

        <form onSubmit={addBook}>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Publication"
            value={form.publication}
            onChange={(e) => setForm({ ...form, publication: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <button className="btn btn-success btn-sm">Add Stock</button>
        </form>
      </div>

      {filteredBooks.length === 0 && (
        <div className="alert alert-info">No stock found.</div>
      )}

      {filteredBooks.map((book) => (
        <div className="card p-3 mb-3" key={book.id}>
          <h4>{book.title}</h4>
          <p className="mb-0">Author: {book.author}</p>
          <p className="mb-0">Publication: {book.publication}</p>
          <p className="mb-0">Price: {book.price}</p>
          <p className="mb-0">Location: {book.location}</p>
          <p className="mb-2">Stock: {book.stockQuantity}</p>

          <button
            className="btn btn-outline-secondary btn-sm w-auto"
            onClick={() => updateBook(book)}
          >
            UPDATE
          </button>
        </div>
      ))}
    </div>
  );
}

export default StockPage;