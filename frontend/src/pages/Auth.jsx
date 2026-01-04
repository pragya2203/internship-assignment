import { useState } from "react";
import api from "../api/axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin) {
      if (!form.confirmPassword) {
        setError("Confirm password is required");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } else {
        await api.post("/auth/signup", {
          email: form.email,
          password: form.password,
        });
        setSuccess("Account created successfully. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm" style={{ width: "380px" }}>
        <div className="card-body">
          <h4 className="text-center mb-3 fw-semibold">
            {isLogin ? "Employee Login" : "Create Account"}
          </h4>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2 text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: "#0b3c5d" }}
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="fw-semibold text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                  }}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="fw-semibold text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                  }}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
