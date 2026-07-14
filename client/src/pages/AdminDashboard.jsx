import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <h1>{dashboard.totalUsers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Products</h3>
          <h1>{dashboard.totalProducts}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <h1>{dashboard.totalOrders}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <h1>₹ {dashboard.totalRevenue}</h1>
        </div>
      </div>

      <h2 style={{ marginTop: "50px" }}>
        Recent Orders
      </h2>

      {dashboard.recentOrders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        dashboard.recentOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>User : {order.user?.name}</h3>

            <p>Email : {order.user?.email}</p>

            <p>Total : ₹ {order.totalPrice}</p>

            <p>Status : {order.status}</p>

            <p>Payment : {order.paymentMethod}</p>

            <p>
              Date :
              {" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 3px 10px rgba(0,0,0,.1)",
  textAlign: "center",
};

export default AdminDashboard;