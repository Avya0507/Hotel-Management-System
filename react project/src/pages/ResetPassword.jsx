import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email from Login page
  const [data, setData] = useState({
    email: location.state?.email || "",
    password: "",
    confirmPassword: ""
  });

  // 🔐 Validation
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!emailRegex.test(data.email)) {
      alert("Invalid Email");
      return false;
    }

    if (!passwordRegex.test(data.password)) {
      alert(
        "Password must contain:\n- Uppercase\n- Lowercase\n- Number\n- Special Character\n- Minimum 6 characters"
      );
      return false;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const resetPassword = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email: data.email,
          password: data.password
        }
      );

      alert(res.data.message || "Password Reset Successful");
      navigate("/");
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>

      {/* Email (Auto-filled) */}
      <input
        placeholder="Email"
        value={data.email}
        disabled
      />

      {/* New Password */}
      <input
        type="password"
        placeholder="New Password"
        value={data.password}
        onChange={e =>
          setData({ ...data, password: e.target.value })
        }
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={e =>
          setData({ ...data, confirmPassword: e.target.value })
        }
      />

      <button onClick={resetPassword}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;