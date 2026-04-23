import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

 
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!emailRegex.test(data.email)) {
      alert("Invalid Email Format (example: abc@gmail.com)");
      return false;
    }

    if (!passwordRegex.test(data.password)) {
      alert(
        "Password must contain:\n- 1 Uppercase\n- 1 Lowercase\n- 1 Number\n- 1 Special Character\n- Minimum 6 characters"
      );
      return false;
    }

    return true;
  };

  const login = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>Hotel Login</h2>

      <input
        placeholder="Email"
        value={data.email}
        onChange={e =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={login}>Login</button>

      {/* 🔥 Forgot Password */}
      <p>
        <Link to="/reset-password"
  state={{ email: data.email }} className="link">
          Forgot Password?
        </Link>
      </p>

      <p>
        Don't have an account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;