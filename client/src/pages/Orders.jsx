import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to load orders");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Order ID</h3>
            <p>{order._id}</p>

            <h3>Status</h3>
            <p>{order.orderStatus}</p>

            <h3>Total Price</h3>
            <p>₹ {order.totalPrice}</p>

            <h3>Products</h3>

            {order.products
              ?.filter((item) => item.product)
              .map((item) => (
                <div key={item._id}>
                  <p>
                    {item.product.name} × {item.quantity}
                  </p>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;