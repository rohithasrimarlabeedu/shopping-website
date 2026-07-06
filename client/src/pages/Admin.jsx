import { Link } from "react-router-dom";

function Admin() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🛠 Admin Dashboard</h1>

      <div style={{ marginTop: "30px" }}>
        <Link to="/admin/add-product">
          <button
            style={{
              padding: "15px",
              marginRight: "20px",
              cursor: "pointer",
            }}
          >
            ➕ Add Product
          </button>
        </Link>

        <Link to="/admin/products">
          <button
            style={{
              padding: "15px",
              marginRight: "20px",
              cursor: "pointer",
            }}
          >
            📦 Manage Products
          </button>
        </Link>

        <Link to="/admin/orders">
          <button
            style={{
              padding: "15px",
              cursor: "pointer",
            }}
          >
            📋 Manage Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;