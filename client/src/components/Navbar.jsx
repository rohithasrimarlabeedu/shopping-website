import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.navbar}>
      <h2 style={{ color: "white" }}>Shopping App</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/cart" style={styles.link}>Cart</Link>
          </>
        ) : (
          <>
            <span style={{ color: "white" }}>
              Hi, {user.name}
            </span>

            <button onClick={logout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;