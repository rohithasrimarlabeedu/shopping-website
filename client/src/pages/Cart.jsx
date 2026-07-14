import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/cart/update`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  if (!cart) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Unable to load cart.</h2>
      </div>
    );
  }

  let total = 0;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>🛒 My Cart</h1>

      {cart.products.filter((item) => item.product).length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
          }}
        >
          <h2>Your Cart is Empty</h2>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              border: "none",
              background: "#2196F3",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.products
            .filter((item) => item.product)
            .map((item) => {
              const subtotal =
                item.product.price * item.quantity;

              total += subtotal;

              return (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "20px",
                    alignItems: "center",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={
                      item.product.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.product.name}
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150";
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h2>{item.product.name}</h2>

                    <p>{item.product.description}</p>

                    <p>
                      <strong>Category:</strong>{" "}
                      {item.product.category}
                    </p>

                    <p
                      style={{
                        color:
                          item.product.stock > 0
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {item.product.stock > 0
                        ? `Stock : ${item.product.stock}`
                        : "Out Of Stock"}
                    </p>

                    <h3>₹ {item.product.price}</h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginTop: "15px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <h3
                      style={{
                        marginTop: "15px",
                        color: "#4CAF50",
                      }}
                    >
                      Subtotal : ₹ {subtotal}
                    </h3>

                    <button
                      onClick={() =>
                        removeFromCart(item.product._id)
                      }
                      style={{
                        marginTop: "15px",
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              border: "2px solid #ddd",
              borderRadius: "12px",
              background: "#fafafa",
            }}
          >
            <h2>Total Amount</h2>

            <h1
              style={{
                color: "#4CAF50",
              }}
            >
              ₹ {total}
            </h1>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "16px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;