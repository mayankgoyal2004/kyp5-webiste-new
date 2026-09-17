import React, { createContext, useContext, useState, useEffect } from "react";
import studentApi from "../api/studentApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("");

  // Check URL query parameters for referral code (?ref=XYZ)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("referrer");
    if (ref) {
      setReferralCode(ref.trim().toUpperCase());
      sessionStorage.setItem("kyp5_referral_code", ref.trim().toUpperCase());
    } else {
      const savedRef = sessionStorage.getItem("kyp5_referral_code");
      if (savedRef) setReferralCode(savedRef);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("studentData");
    const storedToken = localStorage.getItem("studentToken");
    if (storedUser && storedToken) {
      try {
        setStudent(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("studentData");
        localStorage.removeItem("studentToken");
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (studentData, authToken) => {
    localStorage.setItem("studentData", JSON.stringify(studentData));
    localStorage.setItem("studentToken", authToken);
    setStudent(studentData);
    setToken(authToken);
  };

  const logoutUser = async () => {
    try {
      if (token) {
        await studentApi.logout().catch(() => {});
      }
    } finally {
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentData");
      localStorage.removeItem("attemptId");
      setStudent(null);
      setToken(null);
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await studentApi.getMe();
      if (res && res.data) {
        setStudent(res.data);
        localStorage.setItem("studentData", JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn("Failed to refresh student profile", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        token,
        isAuthenticated: !!token && !!student,
        loading,
        referralCode,
        setReferralCode,
        loginUser,
        logoutUser,
        refreshProfile,
        setStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
