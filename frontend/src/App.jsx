import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import MyReservations from "./pages/MyReservations";
import StockPage from "./pages/StockPage";
import StallReservations from "./pages/StallReservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/stall-home" element={<StockPage />} />
        <Route path="/stall-reservations" element={<StallReservations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;