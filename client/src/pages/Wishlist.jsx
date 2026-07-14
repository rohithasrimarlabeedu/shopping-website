import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(data.wishlist.products || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWishlist();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to remove product"
      );
    }
  };

  const moveToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/cart/add`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.delete(
        `${API}/wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Moved to cart");

      fetchWishlist();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to move product"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading Wishlist...</h2>
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
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h2>Your Wishlist is Empty</h2>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "12px 30px",
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item.product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                background: "#fff",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,.08)",
              }}
            >
              <img
                src={
                  item.product.image ||
                  "https://via.placeholder.com/250"
                }
                alt={item.product.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/250";
                }}
              />

              <h2>{item.product.name}</h2>

              <p>{item.product.description}</p>

              <h3>₹ {item.product.price}</h3>

              <button
                onClick={() =>
                  moveToCart(item.product._id)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "15px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🛒 Move To Cart
              </button>

              <button
                onClick={() =>
                  removeWishlist(item.product._id)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;