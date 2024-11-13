import ProductList from "./pages/ProductList/ProductList";
import CartList from "./pages/CartList/CartList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
