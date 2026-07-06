import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
      alert("Failed to load product");
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h2>Loading Product...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={
            product.image ||
            "https://picsum.photos/500"
          }
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "12px",
          }}
          onError={(e) => {
            e.target.src =
              "https://picsum.photos/500";
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <h1>{product.name}</h1>

        <h2
          style={{
            color: "green",
          }}
        >
          ₹ {product.price}
        </h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "30px",
          }}
        >
          {product.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock}
        </p>

        <button
          onClick={addToCart}
          style={{
            marginTop: "30px",
            padding: "15px 40px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          🛒 Add To Cart
        </button>

        <button
          onClick={() => navigate("/cart")}
          style={{
            marginTop: "30px",
            marginLeft: "20px",
            padding: "15px 40px",
            background: "#2196F3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          Buy Now
        </button>

        <br />

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "25px",
            background: "#555",
            color: "white",
            padding: "12px 30px",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;