import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "https://shopping-website-2ytp.onrender.com/api/cart"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(data.cart);
    } catch (error) {
  console.log(error);

  if (error.response) {
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;

      const token = localStorage.getItem("token");

      await axios.put(
        "https://shopping-website-2ytp.onrender.com/api/cart/update"
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

      await axios.delete(
        `https://shopping-website-2ytp.onrender.com/api/cart/remove/${productId}`
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

  if (!cart) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  let total = 0;

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 My Cart</h1>

      {cart.products.filter(item => item.product).length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.products
            .filter((item) => item.product)
            .map((item) => {
              total += item.product.price * item.quantity;

              return (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/120?text=No+Image";
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h2>{item.product.name}</h2>

                    <p>{item.product.description}</p>

                    <h3>₹ {item.product.price}</h3>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginTop: "10px",
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

                    <button
                      onClick={() =>
                        removeFromCart(item.product._id)
                      }
                      style={{
                        marginTop: "15px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

          <hr />

          <h2>Total Price : ₹ {total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "20px",
              padding: "15px 30px",
              background: "green",
              color: "white",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;