import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Grocery",
    "Books",
    "Home",
    "Beauty",
    "Sports",
    "Toys",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/products`);

      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filterCategory = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === category.toLowerCase()
        )
      );
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
        `${API}/cart/add`,
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
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="home">
      <h1>🛍 Shopping Store</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterCategory(category)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              background:
                selectedCategory === category ? "#4CAF50" : "#ddd",
              color:
                selectedCategory === category ? "white" : "black",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Products Found</h2>
      ) : (
        <div className="products">
          {filteredProducts.map((product) => (
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

              <h4>{product.category}</h4>

              <div className="price">₹ {product.price}</div>

              <button
                onClick={() => addToCart(product._id)}
              >
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