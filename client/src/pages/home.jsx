import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      console.log("Products API:", response.data);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add product to cart");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Products...</h2>;
  }

  return (
    <div className="home">
      <h1>🛍 Shopping Store</h1>

      {products.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Products Found</h2>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div className="card" key={product._id}>
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/250x220?text=No+Image"
                }
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/250x220?text=No+Image";
                }}
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <div className="price">₹ {product.price}</div>

              <button onClick={() => addToCart(product._id)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;