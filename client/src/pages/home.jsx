import { useEffect, useState } from "react";
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
  import { useEffect, useState } from "react";
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
                  : "Out of Stock"}
              </p>

              <div className="price">₹ {product.price}</div>

              <button
                onClick={() => addToCart(product._id)}
                disabled={product.stock <= 0}
                style={{
                  width: "100%",
                  background:
                    product.stock > 0 ? "#2196F3" : "#888",
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