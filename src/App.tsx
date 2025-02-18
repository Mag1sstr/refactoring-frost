import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./pages/AppRoutes";
import { useAppDispatch } from "./store/store";
import { getUser } from "./store/slices/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  dispatch(getUser());

  return (
    <>
      <Header />
      <ToastContainer />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
