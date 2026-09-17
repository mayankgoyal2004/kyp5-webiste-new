import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, ArrowRight, GraduationCap, KeyRound } from "lucide-react";
import studentApi from "../api/studentApi";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(1); // 1 = enter email, 2 = enter otp & new pass
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || "/student/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await studentApi.login({ email, password });
      if (res && res.data) {
        loginUser(res.data.user, res.data.accessToken);
        toast.success("Login successful!");
        navigate(returnUrl);
      }
    } catch (err) {
      toast.error(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your registered email.");
      return;
    }
    try {
      setForgotLoading(true);
      await studentApi.forgotPassword({ email: forgotEmail });
      toast.success("Password reset OTP sent to your email!");
      setForgotStep(2);
    } catch (err) {
      toast.error(err.message || "Failed to send reset OTP.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetOtp || !newPassword) {
      toast.error("Please enter OTP and new password.");
      return;
    }
    try {
      setForgotLoading(true);
      await studentApi.resetPassword({
        email: forgotEmail,
        otp: resetOtp,
        newPassword,
      });
      toast.success("Password reset successfully! You can now log in.");
      setForgotModalOpen(false);
      setForgotStep(1);
      setPassword("");
    } catch (err) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="py-16 min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f172a]">Student Portal Login</h2>
          <p className="text-xs text-slate-500">
            Access your psychometric assessments and career reports.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotModalOpen(true);
                }}
                className="text-[11px] font-bold text-cyan-600 hover:underline cursor-pointer"
              >
                Forgot Password • </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {loading ? "Logging in..." : "Login to Student Portal →"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Don't have a student account • </span>
          <Link to="/register" className="font-bold text-cyan-600 hover:underline">
            Register Here
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Student Password"
        maxWidth="max-w-md"
      >
        {forgotStep === 1 ? (
          <form onSubmit={handleSendResetOtp} className="space-y-4">
            <p className="text-xs text-slate-600">
              Enter your registered student email address. We will send you a 6-digit verification code.
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-2.5 rounded-xl text-xs"
            >
              {forgotLoading ? "Sending OTP..." : "Send Verification OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-xs text-slate-600">
              Enter the 6-digit OTP sent to <strong>{forgotEmail}</strong> and your new password.
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">6-Digit OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-center font-mono font-bold tracking-widest text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="Create new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-2.5 rounded-xl text-xs"
            >
              {forgotLoading ? "Resetting..." : "Save New Password"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
