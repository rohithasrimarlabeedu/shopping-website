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
    const addToCart = async (productId) => {
      const searchProducts = (value) => {
  setSearch(value);

  let filtered = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );
  });

  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() ===
          selectedCategory.toLowerCase()
    );
  }

  setFilteredProducts(filtered);
};

const sortProducts = (type) => {
  setSort(type);

  const sorted = [...filteredProducts];

  if (type === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (type === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (type === "az") {
    sorted.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  setFilteredProducts(sorted);
};

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

<p
  style={{
    color: "green",
    fontWeight: "bold",
  }}
>
  Stock : {product.stock}
</p>

              <div className="price">₹ {product.price}</div>

              <button
  onClick={() => addToCart(product._id)}
  style={{
    width: "100%",
    background: "#2196F3",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  🛒 Add To Cart
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;