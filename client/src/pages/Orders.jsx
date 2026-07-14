import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2 style={{ marginTop: "40px" }}>
          No Orders Yet
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginBottom: "30px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <div>
                <h3>Order ID</h3>
                <p>{order._id}</p>
              </div>

              <div>
                <h3>Status</h3>

                <span
                  style={{
                    background:
                      order.status === "Delivered"
                        ? "#4CAF50"
                        : order.status === "Shipped"
                        ? "#2196F3"
                        : "#ff9800",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <hr />

            {order.products.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <img
                  src={
                    item.product?.image ||
                    "https://via.placeholder.com/120"
                  }
                  alt={item.product?.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div>
                  <h2>{item.product?.name}</h2>

                  <p>{item.product?.description}</p>

                  <h3>
                    ₹ {item.product?.price}
                  </h3>

                  <p>
                    Quantity : {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <hr />

            <h2
              style={{
                textAlign: "right",
                color: "#4CAF50",
              }}
            >
              Total : ₹ {order.totalPrice}
            </h2>

            <p>
              Payment : {order.paymentMethod}
            </p>

            <p>
              Ordered On :
              {" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;