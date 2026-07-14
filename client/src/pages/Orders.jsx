import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>📦 My Orders</h1>

      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <div style={{ flex: 1 }}>
          <h2>Sample Product</h2>

          <p>Your order has been placed successfully.</p>

          <h3 style={{ color: "green" }}>Status: Confirmed ✅</h3>

          <p>Estimated Delivery: 3 - 5 Days</p>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "15px",
              padding: "12px 25px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;