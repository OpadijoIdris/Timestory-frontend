import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(form);
            navigate("/");

        } catch (err) {
            // will later change to toaster
            alert (err.response?.data.message || "login failed") 
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow rounded space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;