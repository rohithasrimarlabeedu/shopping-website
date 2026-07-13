import { useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);
      console.log("PRODUCT:", product);

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.post(
        `${API}/products`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.log("========== ERROR ==========");
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          `Status: ${error.response.status}\nMessage: ${
            error.response.data.message
          }`
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Add Product</h1>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <button
        onClick={addProduct}
        style={{
          width: "100%",
          padding: 15,
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;