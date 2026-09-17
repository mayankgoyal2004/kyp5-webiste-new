import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { User, Mail, Lock, Phone, School, Sparkles, CheckCircle2 } from "lucide-react";
import studentApi from "../api/studentApi";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";

export default function Register() {
  const [searchParams] = useSearchParams();
  const refCodeFromUrl = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    schoolInstitute: "",
    teacherReferrer: refCodeFromUrl,
    gender: "MALE",
  });
  const [loading, setLoading] = useState(false);

  // OTP Verification Modal State
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in your name, email, and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await studentApi.register(formData);
      if (res && res.data) {
        toast.success("Account created! Please verify the OTP sent to your email.");
        setOtpModalOpen(true);
      }
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const res = await studentApi.verifyOtp({ email: formData.email, otp });
      if (res && res.data) {
        loginUser(res.data.user, res.data.accessToken);
        toast.success("Email verified! Welcome to KYP5 Assessment Portal.");
        setOtpModalOpen(false);
        navigate("/tests");
      }
    } catch (err) {
      toast.error(err.message || "Invalid OTP code.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await studentApi.resendOtp({ email: formData.email });
      toast.success("A fresh OTP has been sent to your email.");
    } catch (err) {
      toast.error(err.message || "Could not resend OTP.");
    }
  };

  return (
    <div className="py-12 min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f172a]">Create Student Account</h2>
          <p className="text-xs text-slate-500">
            Sign up to take validated psychometric tests and receive your career report.
          </p>
        </div>

        {refCodeFromUrl && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-cyan-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>
              School Referral Code <strong>{refCodeFromUrl}</strong> applied.
            </span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Navjot Kaur"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">School / Institute</label>
              <input
                type="text"
                placeholder="School name"
                value={formData.schoolInstitute}
                onChange={(e) => setFormData({ ...formData, schoolInstitute: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              School Referral Code (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. DPS2026"
              value={formData.teacherReferrer}
              onChange={(e) => setFormData({ ...formData, teacherReferrer: e.target.value.toUpperCase() })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account & Verify OTP →"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-cyan-600 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        title="Verify Email Address"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <p className="text-xs text-slate-600">
            We sent a 6-digit OTP code to <strong>{formData.email}</strong>. Enter it below to activate your account:
          </p>

          <div>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-base font-mono font-black tracking-widest text-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={verifyingOtp}
            className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-3 rounded-xl text-xs"
          >
            {verifyingOtp ? "Verifying..." : "Verify OTP & Continue"}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-xs font-bold text-cyan-600 hover:underline cursor-pointer"
            >
              Didn't receive code? Resend OTP
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
