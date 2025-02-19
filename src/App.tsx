import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./pages/AppRoutes";
import { useAppDispatch } from "./store/store";
import { getUser } from "./store/slices/authSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  dispatch(getUser());

  const navigate = useNavigate();

  useEffect(() => {
    navigate(JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}"));
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <ToastContainer />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
