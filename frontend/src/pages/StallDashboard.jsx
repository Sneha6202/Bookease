import { useEffect, useState } from "react";
import api from "../services/api";

function StallDashboard() {
  const [stallId, setStallId] = useState("");
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stockQuantity: "",
    description: "",
  });

  const loadBooks = async (id) => {
    if (!id) return;
    try {
      const res = await api.get(`/books/stall/${id}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();

    if (!stallId) {
      alert("Enter stall id first");
      return;
    }

    try {
      await api.post(`/books/stall/${stallId}`, {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
      });

      alert("Book added successfully");

      setForm({
        title: "",
        author: "",
        category: "",
        price: "",
        stockQuantity: "",
        description: "",
      });

      loadBooks(stallId);
    } catch (error) {
      alert("Failed to add book");
      console.error(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      alert("Book deleted");
      loadBooks(stallId);
    } catch (error) {
      alert("Delete failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (stallId) {
      loadBooks(stallId);
    }
  }, [stallId]);

  return (
    <div>
      <h2 className="mb-3">Book Stall Dashboard</h2>

      <input
        className="form-control mb-4"
        placeholder="Enter stall id"
        value={stallId}
        onChange={(e) => setStallId(e.target.value)}
      />

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Add Book</h4>
        <form onSubmit={addBook}>
          <input
            className="form-control mb-3"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
            required
          />
          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <button className="btn btn-success">Add Book</button>
        </form>
      </div>

      <h4 className="mb-3">My Books</h4>

      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4 mb-3" key={book.id}>
              <div className="card shadow-sm h-100 p-3">
                <h5>{book.title}</h5>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p><strong>Stock:</strong> {book.stockQuantity}</p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books added yet.</p>
        )}
      </div>
    </div>
  );
}

export default StallDashboard;