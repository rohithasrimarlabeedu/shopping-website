import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";

import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin */}

        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/admin/manage-products"
          element={<ManageProducts />}
        />

        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;