import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🛠 Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/admin/add-product">➕ Add Product</Link>

        <Link to="/admin/products">📦 Manage Products</Link>

        <Link to="/admin/orders">📋 Manage Orders</Link>

        <Link to="/">🏠 Back Home</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;