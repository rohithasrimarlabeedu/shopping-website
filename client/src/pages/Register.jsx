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
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        phone,
      });

      alert("Registration Success");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>

      <form onSubmit={registerUser}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <br /><br />

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />

        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;