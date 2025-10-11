import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handle submit function")
    setLoading(true);
    setError("");

    try {
      console.log("form submitting")
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("Data fetch from api : ",res.data)

      // ✅ Save token & role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // ✅ Redirect based on backend (if admin)
      if (res.data.user.role.toLowerCase() === "admin") {
        navigate("/dashboard/admin");
        console.log("logged in")
      } else {
        // navigate("/"); // you can change this for other roles
        console.log("not logged in")
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card card shadow-sm">
        <div className="card-body p-4">
          <div className="brand text-center mb-3">
            <div className="brand-logo mb-2">CARE</div>
            <h4 className="mb-0">Dialysis Center CRM</h4>
            <small className="text-muted">Welcome back — please sign in</small>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">Email address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="small">Forgot?</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <hr />

          <div className="text-center small text-muted">
            Don't have an account? <a href="#">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
}
