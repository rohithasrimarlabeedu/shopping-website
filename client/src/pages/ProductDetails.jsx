import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://shopping-website-2ytp.onrender.com/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${API}/products/${id}`);

      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load product");
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        `${API}/cart/add`,
        {
          productId: product._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message || "Added to Cart");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to add product"
      );
    }
  };

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        <h2>Loading Product...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        display: "flex",
        gap: "50px",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={
            product.image ||
            "https://via.placeholder.com/500"
          }
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,.2)",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500";
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h1>{product.name}</h1>

        <h2
          style={{
            color: "#0a8f08",
            marginTop: "15px",
          }}
        >
          ₹ {product.price}
        </h2>

        <p
          style={{
            color: "#ffaa00",
            fontSize: "18px",
          }}
        >
          ⭐⭐⭐⭐☆ (4.5)
        </p>

        <p
          style={{
            lineHeight: "28px",
            marginTop: "20px",
          }}
        >
          {product.description}
        </p>

        <p>
          <strong>Category :</strong> {product.category}
        </p>

        <p>
          <strong>Available :</strong>{" "}
          <span
            style={{
              color:
                product.stock > 0
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {product.stock > 0
              ? `${product.stock} Items`
              : "Out Of Stock"}
          </span>
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <h3>{quantity}</h3>

          <button
            onClick={() =>
              quantity < product.stock &&
              setQuantity(quantity + 1)
            }
          >
            +
          </button>
        </div>

        <button
          onClick={addToCart}
          disabled={product.stock <= 0}
          style={{
            marginTop: "35px",
            width: "220px",
            padding: "15px",
            background:
              product.stock > 0
                ? "#2196F3"
                : "#888",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor:
              product.stock > 0
                ? "pointer"
                : "not-allowed",
            fontSize: "17px",
          }}
        >
          🛒 Add To Cart
        </button>

        <br />

        <button
          onClick={() => navigate("/checkout")}
          style={{
            marginTop: "20px",
            width: "220px",
            padding: "15px",
            background: "#0a8f08",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          Buy Now
        </button>

        <br />

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#555",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;