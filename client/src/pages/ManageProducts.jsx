import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/products`);
      setProducts(data.products || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!window.confirm("Delete this product?")) return;

      const { data } = await axios.delete(`${API}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(data.message);
      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Manage Products</h1>

      {products.length === 0 ? (
        <h3>No products found.</h3>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() =>
                  navigate(`/admin/edit-product/${product._id}`)
                }
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageProducts;