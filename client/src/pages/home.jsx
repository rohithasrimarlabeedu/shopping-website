import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const navigate = useNavigate();
  

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

    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const searchProducts = (value) => {
    setSearch(value);

    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() ===
            selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const sortProducts = (type) => {
    setSort(type);

    const sorted = [...filteredProducts];

    if (type === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (type === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(sorted);
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
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1976d2",
    padding: "15px 25px",
    borderRadius: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  }}
>
  <h2 style={{ color: "white", margin: 0 }}>
    Shopping Website
  </h2>

  <div
    style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    }}
  >
    <button onClick={() => navigate("/")}>Home</button>

    <button onClick={() => navigate("/wishlist")}>
      ❤️ Wishlist
    </button>

    <button onClick={() => navigate("/cart")}>
      🛒 Cart
    </button>

    <button onClick={() => navigate("/orders")}>
      📦 Orders
    </button>

    <button onClick={() => navigate("/login")}>
      Login
    </button>

    <button onClick={() => navigate("/register")}>
      Register
    </button>

    <button
      onClick={() => navigate("/admin/manage-products")}
    >
      Admin
    </button>
  </div>
</div>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    margin: "20px 0",
  }}
>
  <button onClick={() => window.location.href="/login"}>Login</button>

  <button onClick={() => window.location.href="/register"}>Register</button>

  <button onClick={() => window.location.href="/cart"}>Cart</button>

  <button onClick={() => window.location.href="/wishlist"}>Wishlist</button>

  <button onClick={() => window.location.href="/orders"}>Orders</button>

  <button onClick={() => window.location.href="/admin/add-product"}>
    Add Product
  </button>

  <button onClick={() => window.location.href="/admin/manage-products"}>
    Manage Products
  </button>
</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => searchProducts(e.target.value)}
          style={{
            padding: "12px",
            width: "320px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={sort}
          onChange={(e) => sortProducts(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <option value="default">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="az">Name A → Z</option>
        </select>
      </div>

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
                selectedCategory === category
                  ? "#4CAF50"
                  : "#ddd",
              color:
                selectedCategory === category
                  ? "white"
                  : "black",
            }}
          >
            {category}
          </button>
        ))}
      </div>
            {filteredProducts.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Products Found
        </h2>
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

              <p
                style={{
                  color: product.stock > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {product.stock > 0
                  ? `Stock: ${product.stock}`
                  : "Out Of Stock"}
              </p>

              <div className="price">
                ₹ {product.price}
              </div>

              <button
                onClick={() => addToCart(product._id)}
                disabled={product.stock <= 0}
                style={{
                  width: "100%",
                  background:
                    product.stock > 0
                      ? "#2196F3"
                      : "#888",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor:
                    product.stock > 0
                      ? "pointer"
                      : "not-allowed",
                  marginTop: "10px",
                }}
              >
                {product.stock > 0
                  ? "🛒 Add To Cart"
                  : "Out Of Stock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;