import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductInfo from "./ProductInfo/ProductInfo";
import SearchPage from "./SearchPage/SearchPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductInfo />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
