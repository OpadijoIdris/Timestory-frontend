// src/pages/auth/VerifyEmail.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, resendVerificationEmail } from "../../api/auth.api";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // passed from Register

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">No email provided. Please register again.</p>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyEmail({ email, code });
      toast.success(res.message || "Email verified successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await resendVerificationEmail({ email });
      toast.success(res.message || "New code sent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 shadow rounded space-y-4">
        <h2 className="text-2xl font-bold text-center">Verify Email</h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter the code sent to <strong>{email}</strong>
          </p>
          <input
            type="text"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-gray-500 text-white py-2 rounded"
        >
          {loading ? "Resending..." : "Resend Code"}
        </button>
      </div>
    </div>
  );
}