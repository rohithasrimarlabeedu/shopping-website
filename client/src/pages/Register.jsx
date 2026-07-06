import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://shopping-website-2ytp.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          phone,
        }
      );

      alert(data.message || "Registration Successful");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>

      <form onSubmit={registerUser}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;