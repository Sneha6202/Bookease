import { useEffect, useState } from "react";
import api from "../services/api";

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchBooks = async () => {
    try {
      if (!title.trim()) {
        fetchBooks();
        return;
      }
      const res = await api.get(`/books/search?title=${title}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const reserveBook = async (bookId) => {
    const userId = prompt("Enter your user id");
    const quantity = prompt("Enter quantity");

    if (!userId || !quantity) return;

    try {
      await api.post(`/reservations?userId=${userId}&bookId=${bookId}&quantity=${quantity}`);
      alert("Book reserved successfully");
      fetchBooks();
    } catch (error) {
      alert("Reservation failed");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Search Books</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchBooks}>
          Search
        </button>
      </div>

      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card shadow-sm h-100 p-3">
                <h5>{book.title}</h5>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p><strong>Stock:</strong> {book.stockQuantity}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <button
                  className="btn btn-warning mt-auto"
                  onClick={() => reserveBook(book.id)}
                >
                  Reserve Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;