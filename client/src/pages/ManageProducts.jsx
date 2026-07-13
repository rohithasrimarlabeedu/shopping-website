import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/orders`,
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

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Updated Successfully");
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update order");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Manage Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
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
            <h3>Customer</h3>
            <p>{order.user?.name}</p>

            <h3>Email</h3>
            <p>{order.user?.email}</p>

            <h3>Total Price</h3>
            <p>₹ {order.totalPrice}</p>

            <h3>Products</h3>

            {order.products
              ?.filter((item) => item.product)
              .map((item) => (
                <p key={item._id}>
                  {item.product.name} × {item.quantity}
                </p>
              ))}

            <br />

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageOrders;