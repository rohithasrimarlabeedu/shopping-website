import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import ManageOrders from "./pages/ManageOrders";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>
            Home
          </Link>

          <Link to="/login" style={{ marginRight: "20px" }}>
            Login
          </Link>

          <Link to="/register" style={{ marginRight: "20px" }}>
            Register
          </Link>

          <Link to="/cart" style={{ marginRight: "20px" }}>
            Cart
          </Link>

          <Link to="/orders" style={{ marginRight: "20px" }}>
            Orders
          </Link>

          <Link to="/admin">
            Admin
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<Admin />} />

          <Route
            path="/admin/add-product"
            element={<AddProduct />}
          />
          <Route
  path="/admin/products"
  element={<ManageProducts />}
/>
<Route path="/admin/products" ... />
<Route path="/admin/edit-product/:id" ... />
<Route
  path="/admin/edit-product/:id"
  element={<EditProduct />}
/>
<Route
  path="/admin/orders"
  element={<ManageOrders />}
/>
<Route path="/admin/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;