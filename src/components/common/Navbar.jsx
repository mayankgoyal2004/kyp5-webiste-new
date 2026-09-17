import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";
import publicApi from "../../api/publicApi";
import Swal from "sweetalert2";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, student, logoutUser } = useAuth();
  const { siteConfig } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  const servicesRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices();
        if (res && res.data) {
          const list = Array.isArray(res.data) ? res.data : res.data.items || [];
          setServices(list);
        }
      } catch (err) {
        console.warn("Using fallback services", err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogoutConfirm = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white ${
        scrolled ? "shadow-md py-3" : "border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Only */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/images/logo/main-logo.png"
              alt="KYP5 Logo"
              className="h-11 sm:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.src = "/assets/images/logo/kyp5.png";
              }}
            />
          </Link>

          {/* Clean Main Nav Links (Matching Previous Website) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            <Link
              to="/about-us"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/about-us")
                  ? "text-[#1b93ad] font-bold"
                  : "text-slate-700 hover:text-[#1b93ad]"
              }`}
            >
              About us
            </Link>

            <Link
              to="/why-choose-us"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/why-choose-us")
                  ? "text-[#1b93ad] font-bold"
                  : "text-slate-700 hover:text-[#1b93ad]"
              }`}
            >
              Why Choose Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad] transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#1b93ad]" : "text-slate-400"
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                  {services.length > 0 ? (
                    services.map((svc, idx) => (
                      <Link
                        key={idx}
                        to={`/service-details/${encodeURIComponent(svc.title)}`}
                        className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] transition-colors"
                      >
                        {svc.title}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        to="/service-details/One-on-One%20Career%20Counseling"
                        className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad]"
                      >
                        One-on-One Career Counseling
                      </Link>
                      <Link
                        to="/service-details/Institutional%20School%20Assessment%20Drives"
                        className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad]"
                      >
                        School Assessment Drives
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/our-blogs"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/our-blogs")
                  ? "text-[#1b93ad] font-bold"
                  : "text-slate-700 hover:text-[#1b93ad]"
              }`}
            >
              Our Blogs
            </Link>

            <Link
              to="/our-team"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/our-team")
                  ? "text-[#1b93ad] font-bold"
                  : "text-slate-700 hover:text-[#1b93ad]"
              }`}
            >
              Our Team
            </Link>

            <Link
              to="/help-center"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive("/help-center")
                  ? "text-[#1b93ad] font-bold"
                  : "text-slate-700 hover:text-[#1b93ad]"
              }`}
            >
              Help Center
            </Link>
          </nav>

          {/* Right Area: Contact Us + Login/Register (or User Profile) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center bg-[#2995ac] hover:bg-[#207f94] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              Contact Us
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
                >
                  <img
                    src={student?.avatar || "/assets/images/auser.jpg"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#1b93ad]"
                    onError={(e) => {
                      e.target.src = "/assets/images/auser.jpg";
                    }}
                  />
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {student?.name?.split(" ")[0] || "Student"}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[100px]">
                      {student?.email}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-800">{student?.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{student?.email}</div>
                    </div>

                    <Link
                      to="/student/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#1b93ad]" />
                      <span>My Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogoutConfirm}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center bg-[#218197] hover:bg-[#1a6e82] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            to="/about-us"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            About us
          </Link>
          <Link
            to="/why-choose-us"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            Why Choose Us
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            Services
          </Link>
          <Link
            to="/our-blogs"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            Our Blogs
          </Link>
          <Link
            to="/our-team"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            Our Team
          </Link>
          <Link
            to="/help-center"
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1b93ad]"
          >
            Help Center
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/contact-us"
              className="w-full text-center py-2.5 bg-[#2995ac] text-white rounded-lg text-xs font-bold"
            >
              Contact Us
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogoutConfirm}
                className="w-full text-center py-2.5 text-red-600 border border-red-200 rounded-lg text-xs font-bold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full text-center py-2.5 bg-[#218197] text-white rounded-lg text-xs font-bold"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
