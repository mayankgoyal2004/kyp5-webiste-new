import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Sparkles,
  School,
  PhoneCall,
  LogIn,
  Layers,
  ArrowRight
} from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useAuth } from "../../context/AuthContext";
import publicApi from "../../api/publicApi";
import { resolveImageUrl, extractItemData } from "../../utils/dataHelper";

export default function Navbar() {
  const { siteData } = useSite();
  const { student, isAuthenticated, logout, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);

  const servicesRef = useRef(null);
  const userRef = useRef(null);

  // Fetch active services for dropdown
  useEffect(() => {
    let isMounted = true;
    const loadServices = async () => {
      try {
        const res = await publicApi.getServices();
        if (isMounted && res && res.data) {
          const list = Array.isArray(res.data) ? res.data : res.data.data || [];
          setServicesList(list.map(extractItemData));
        }
      } catch (err) {
        // Fallback gracefully
      }
    };
    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdowns on outside click
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogoutConfirm = async () => {
    try {
      if (typeof logout === "function") {
        await logout();
      } else if (typeof logoutUser === "function") {
        await logoutUser();
      }
    } catch (e) {
      console.error(e);
    }
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const logoSrc = resolveImageUrl(
    siteData?.branding?.logoUrl,
    "/assets/images/logo/main-logo.png"
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 py-2">
            <img
              src={logoSrc}
              alt={siteData?.general?.orgName || "KYP5 Logo"}
              className="h-10 sm:h-11 w-auto object-contain"
              onError={(e) => {
                e.target.src = "/assets/images/logo/main-logo.png";
              }}
            />
          </Link>

          {/* Desktop Navigation Links (Clean Single-Line with whitespace-nowrap) */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 flex-nowrap shrink-0">
            <Link
              to="/about-us"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all " +
                (isActive("/about-us")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              About us
            </Link>

            <Link
              to="/why-choose-us"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all " +
                (isActive("/why-choose-us")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              Why Choose Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative shrink-0" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={
                  "whitespace-nowrap flex items-center gap-1 px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all cursor-pointer " +
                  (isActive("/services") || isActive("/service-details")
                    ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                    : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
                }
              >
                <span>Services</span>
                <ChevronDown
                  className={
                    "w-3.5 h-3.5 transition-transform duration-200 " +
                    (servicesDropdownOpen ? "rotate-180 text-[#1b93ad]" : "text-slate-400")
                  }
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    to="/services"
                    className="block px-4 py-2.5 text-xs font-bold text-[#1b93ad] hover:bg-sky-50 transition-colors border-b border-slate-100"
                  >
                    View All Services &rarr;
                  </Link>

                  {servicesList.length > 0 ? (
                    servicesList.map((srv) => (
                      <Link
                        key={srv.id || srv.slug}
                        to={"/service-details/" + encodeURIComponent(srv.title || srv.slug || srv.id)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] transition-colors truncate"
                      >
                        {srv.title}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        to="/services"
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad]"
                      >
                        One-on-One Career Counseling
                      </Link>
                      <Link
                        to="/services"
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad]"
                      >
                        School Assessment Drives
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* For Schools Link with Integrated Badge */}
            <Link
              to="/pricing"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 " +
                (isActive("/pricing") || isActive("/for-schools") || isActive("/institution")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              <School className="w-3.5 h-3.5 text-[#1b93ad] shrink-0" />
              <span>For Schools</span>
              <span className="text-[9px] font-black uppercase tracking-wider bg-[#1b93ad]/10 text-[#1b93ad] px-1.5 py-0.5 rounded-full border border-[#1b93ad]/20">
                Plans
              </span>
            </Link>

            <Link
              to="/our-blogs"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all " +
                (isActive("/our-blogs")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              Our Blogs
            </Link>

            <Link
              to="/our-team"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all " +
                (isActive("/our-team")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              Our Team
            </Link>

            <Link
              to="/help-center"
              className={
                "whitespace-nowrap px-3 py-2 text-[13px] 2xl:text-sm font-bold rounded-xl transition-all " +
                (isActive("/help-center")
                  ? "text-[#1b93ad] bg-sky-50/80 shadow-xs"
                  : "text-slate-700 hover:text-[#1b93ad] hover:bg-slate-50")
              }
            >
              Help Center
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 2xl:gap-3 shrink-0">
            <Link
              to="/contact-us"
              className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 border border-[#1b93ad]/30 bg-sky-50/50 hover:bg-[#1b93ad]/10 text-[#1b93ad] text-xs 2xl:text-sm font-bold px-4 2xl:px-5 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <span>Contact Us</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative shrink-0" ref={userRef}>
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
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight whitespace-nowrap">
                      {student?.name?.split(" ")[0] || "Student"}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[90px]">
                      {student?.email}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
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
                className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#1b93ad] to-[#2995ac] hover:from-[#15798e] hover:to-[#207f94] text-white text-xs 2xl:text-sm font-bold px-5 2xl:px-6 py-2.5 rounded-xl shadow-md shadow-[#1b93ad]/20 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-8 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/about-us"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            About us
          </Link>
          <Link
            to="/why-choose-us"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            Why Choose Us
          </Link>
          <Link
            to="/services"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-[#1b93ad]" />
              <span>For Schools & Pricing</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider bg-[#1b93ad]/10 text-[#1b93ad] px-2 py-0.5 rounded-full">
              Plans
            </span>
          </Link>
          <Link
            to="/our-blogs"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            Our Blogs
          </Link>
          <Link
            to="/our-team"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            Our Team
          </Link>
          <Link
            to="/help-center"
            className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#1b93ad] rounded-xl transition-colors"
          >
            Help Center
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/contact-us"
              className="w-full text-center py-3 bg-sky-50 text-[#1b93ad] border border-[#1b93ad]/30 rounded-xl text-xs font-bold shadow-xs"
            >
              Contact Us
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogoutConfirm}
                className="w-full text-center py-3 text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full text-center py-3 bg-gradient-to-r from-[#1b93ad] to-[#2995ac] text-white rounded-xl text-xs font-bold shadow-md shadow-[#1b93ad]/20"
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
