// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { forgotPassword, resetPassword } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      setMessage(res.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resetPassword({ email, code, newPassword });
      setMessage(res.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={step === 1 ? handleSendCode : handleResetPassword}
        className="w-full max-w-md bg-white p-6 shadow rounded space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to <strong>{email}</strong>
            </p>
            <input
              type="text"
              placeholder="Enter reset code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {message && <p className="text-center text-sm mt-2">{message}</p>}

        {/* Back to Login link */}
        <p
          onClick={() => navigate("/login")}
          className="text-blue-600 text-sm text-center cursor-pointer mt-2"
        >
          Back to Login
        </p>
      </form>
    </div>
  );
}