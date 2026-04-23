import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <input placeholder="Name"
        onChange={e => setData({...data, name: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})} />

      <button onClick={register}>Register</button>

      <p>
        Already have an account?{" "}
        <Link to="/" className="link">Login</Link>
      </p>
    </div>
  );
}

export default Register;