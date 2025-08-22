import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { logout } from "./features/authSlice";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Container className="pb-5 bg-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </Container>
    </>
  );
}
