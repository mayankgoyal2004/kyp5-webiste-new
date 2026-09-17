import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
  School,
  Building,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Users,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { studentApi } from "../api/studentApi";
import { publicApi } from "../api/publicApi";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/common/Modal";

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const refCodeFromUrl = searchParams.get("ref") || searchParams.get("referral") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "MALE", // MALE | FEMALE | OTHER
    fatherName: "",
    motherName: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    schoolInstitute: "",
    teacherReferrer: refCodeFromUrl.toUpperCase(),
  });

  const [verifiedInstitution, setVerifiedInstitution] = useState(null);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Auto-verify referral code if provided in URL
  useEffect(() => {
    if (refCodeFromUrl) {
      verifyCode(refCodeFromUrl);
    }
  }, [refCodeFromUrl]);

  const verifyCode = async (code) => {
    if (!code || code.trim().length < 3) {
      setVerifiedInstitution(null);
      return;
    }

    try {
      setVerifyingCode(true);
      const res = await publicApi.verifyReferralCode(code.trim());
      if (res && res.data && res.data.valid) {
        setVerifiedInstitution(res.data.institution);
        if (res.data.institution.name && !formData.schoolInstitute) {
          setFormData((prev) => ({
            ...prev,
            schoolInstitute: res.data.institution.name,
            teacherReferrer: code.trim().toUpperCase(),
          }));
        }
      } else {
        setVerifiedInstitution(null);
      }
    } catch (err) {
      setVerifiedInstitution(null);
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleReferralChange = (e) => {
    const val = e.target.value.toUpperCase();
    setFormData({ ...formData, teacherReferrer: val });
    if (val.length >= 3) {
      verifyCode(val);
    } else {
      setVerifiedInstitution(null);
    }
  };

  const validateForm = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      toast.error("Please enter student full name (min 2 characters).");
      return false;
    }
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!formData.fatherName || formData.fatherName.trim().length < 2) {
      toast.error("Father / Guardian name is required (min 2 characters).");
      return false;
    }
    if (!formData.motherName || formData.motherName.trim().length < 2) {
      toast.error("Mother name is required (min 2 characters).");
      return false;
    }
    if (!formData.schoolInstitute || formData.schoolInstitute.trim().length < 2) {
      toast.error("School / Institute name is required.");
      return false;
    }
    if (!formData.country || formData.country.trim().length < 2) {
      toast.error("Country is required.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter (A-Z).");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      toast.error("Password must contain at least one number (0-9).");
      return false;
    }
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone ? formData.phone.trim() : undefined,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth || undefined,
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        country: formData.country.trim(),
        state: formData.state ? formData.state.trim() : undefined,
        city: formData.city ? formData.city.trim() : undefined,
        address: formData.address ? formData.address.trim() : undefined,
        schoolInstitute: formData.schoolInstitute.trim(),
        teacherReferrer: formData.teacherReferrer ? formData.teacherReferrer.trim() : undefined,
      };

      const res = await studentApi.register(payload);
      if (res && res.data) {
        setOtp("");
        toast.success("Account created! Please check your email for the 6-digit OTP code.");
        setOtpModalOpen(true);
      }
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const msg = err.errors.map((e) => e.field + ": " + e.message).join(", ");
        toast.error(msg);
      } else {
        toast.error(err.message || "Registration failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOtpModal = () => {
    setOtp("");
    setOtpModalOpen(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const res = await studentApi.verifyOtp({ email: formData.email, otp: otp.trim() });
      if (res && res.data) {
        setOtp("");
        loginUser(res.data.user, res.data.accessToken);
        toast.success("Email verified successfully! Welcome to KYP5 Career Assessment.");
        setOtpModalOpen(false);
        navigate("/tests");
      }
    } catch (err) {
      toast.error(err.message || "Invalid or expired OTP code.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setOtp("");
      await studentApi.resendOtp({ email: formData.email });
      toast.success("A fresh 6-digit OTP has been sent to your email.");
    } catch (err) {
      toast.error(err.message || "Could not resend OTP. Please try again later.");
    }
  };

  return (
    <div className="py-12 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#1b93ad] flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Student Account Registration</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Fill in your profile details to register for certified psychometric assessment and customized career reports.
          </p>
        </div>

        {/* Verified School Referral Banner */}
        {verifiedInstitution ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-emerald-950">
                School Quota Verified: {verifiedInstitution.name}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                Your assessment participation is sponsored under your institution package.
              </div>
            </div>
          </div>
        ) : refCodeFromUrl ? (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-[#1b93ad] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1b93ad] shrink-0" />
            <span>
              School Referral Code <strong>{refCodeFromUrl}</strong> applied.
            </span>
          </div>
        ) : null}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* 1. Student Personal Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1b93ad] border-b border-slate-100 pb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>1. Student Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navjot Kaur"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>
          </div>

          {/* 2. Parents / Guardian Information */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1b93ad] border-b border-slate-100 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>2. Parents / Guardian Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Father / Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Father's full name"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mother Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Mother's full name"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>
          </div>

          {/* 3. School & Location Information */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1b93ad] border-b border-slate-100 pb-2 flex items-center gap-2">
              <School className="w-4 h-4" />
              <span>3. School & Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School / Institute Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Public School"
                  value={formData.schoolInstitute}
                  onChange={(e) => setFormData({ ...formData, schoolInstitute: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    School Referral Code (Optional)
                  </label>
                  {verifyingCode && (
                    <span className="text-[10px] text-slate-400">Verifying...</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="e.g. DPS2026"
                  value={formData.teacherReferrer}
                  onChange={handleReferralChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Country *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. India"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  placeholder="e.g. Punjab / Delhi"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Ludhiana / Noida"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>
          </div>

          {/* 4. Password & Security */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1b93ad] border-b border-slate-100 pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>4. Password & Security</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 chars, 1 uppercase, 1 number"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
                <div className="text-[10px] text-slate-500 mt-1">
                  Must contain: &ge;6 characters, 1 uppercase letter (A-Z), 1 number (0-9)
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1b93ad] hover:bg-[#15798e] text-white font-bold py-4 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Creating Student Account...</span>
            ) : (
              <>
                <span>Create Student Account & Verify OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Institution Onboarding Link */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-center space-y-1">
          <span className="text-xs text-slate-600 font-medium">Are you a School, Principal or Counselor?</span>
          <div>
            <Link
              to="/institution/register"
              className="text-xs font-bold text-[#1b93ad] hover:underline inline-flex items-center gap-1"
            >
              <span>Register Your School & Buy Assessment Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-[#1b93ad] hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={otpModalOpen}
        onClose={handleCloseOtpModal}
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
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-base font-mono font-black tracking-widest text-slate-800 focus:outline-none focus:border-[#1b93ad]"
            />
          </div>

          <button
            type="submit"
            disabled={verifyingOtp}
            className="w-full bg-[#1b93ad] hover:bg-[#15798e] text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
          >
            {verifyingOtp ? "Verifying..." : "Verify OTP & Continue"}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-xs font-bold text-[#1b93ad] hover:underline cursor-pointer"
            >
              Didn't receive code? Resend OTP
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
