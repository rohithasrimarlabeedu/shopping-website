import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

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
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Edit Product</h1>

      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <button
        onClick={updateProduct}
        style={{
          width: "100%",
          padding: "15px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Update Product
      </button>
    </div>
  );
}

export default EditProduct;