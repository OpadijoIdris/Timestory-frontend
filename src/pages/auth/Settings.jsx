// src/pages/user/Settings.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { forgotPassword, resetPassword } from "../../api/auth.api";
import VerifyEmail from "../auth/VerifyEmail";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuth();

  // Password reset flow
  const [step, setStep] = useState(1);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword({ email: user.email });
      toast.success(res.message || "Reset code sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resetPassword({
        email: user.email,
        code: resetCode,
        newPassword,
      });
      toast.success(res.message || "Password updated successfully");
      setStep(1);
      setResetCode("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container space-y-6">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="font-semibold">Change Password</h3>

        {step === 1 && (
          <form onSubmit={handleSendResetCode} className="space-y-4">
            <p className="text-sm text-gray-600">
              We’ll send a reset code to <strong>{user.email}</strong>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the code sent to <strong>{user.email}</strong>
            </p>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Reset code"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="New password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>

      {/* Verify Email (optional, reuse your existing component) */}
      {!user?.isVerified && (
        <div className="setting-item">
          <h3 className="font-semibold">Verify Email</h3>
          <p className="font-extralight">Please ignore if your account is verified already</p>
          <VerifyEmail />
        </div>
      )}
    </div>
  );
}