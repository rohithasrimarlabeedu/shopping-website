import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!window.confirm("Delete this product?")) return;

      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      {products.map((product) => (
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

          <p>Stock : {product.stock}</p>

         <button
  onClick={() =>
    window.location.href = `/admin/edit-product/${product._id}`
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
        </div>
      ))}
    </div>
  );
}

export default ManageProducts;