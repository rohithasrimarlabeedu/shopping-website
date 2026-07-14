import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");

  const placeOrder = () => {
    if (!address || !city || !mobile) {
      alert("Please fill all fields");
      return;
    }

    alert("Order Placed Successfully 🎉");

    navigate("/orders");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h1>Checkout</h1>

      <input
        type="text"
        placeholder="Full Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
        }}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
        }}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "15px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;