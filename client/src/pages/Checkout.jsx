import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Checkout() {
  const [cart, setCart] = useState(null);

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

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
    }
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API}/orders`,
        {
          shippingAddress: address,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message || "Order Placed Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to place order"
      );
    }
  };

  if (!cart) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  let total = 0;

  cart.products.forEach((item) => {
    if (item.product) {
      total += item.product.price * item.quantity;
    }
  });

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px",
      }}
    >
      <div>
        <h1>Delivery Address</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={address.mobile}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={address.address}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          style={inputStyle}
        />

        <h2>Payment Method</h2>

        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Cash On Delivery
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Online Payment
        </label>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Order Summary</h2>

        {cart.products.map((item) =>
          item.product ? (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>

              <strong>
                ₹ {item.product.price * item.quantity}
              </strong>
            </div>
          ) : null
        )}

        <hr />

        <h2>Total : ₹ {total}</h2>

        <button
          onClick={placeOrder}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

export default Checkout;