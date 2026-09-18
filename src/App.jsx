import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SiteProvider } from "./context/SiteContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import TestExamLayout from "./layouts/TestExamLayout";

import Home from "./pages/Home";
import TestsCatalog from "./pages/TestsCatalog";
import TestInstruction from "./pages/TestInstruction";
import TestRunner from "./pages/TestRunner";
import TestResult from "./pages/TestResult";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import AboutUs from "./pages/AboutUs";
import WhyChooseUs from "./pages/WhyChooseUs";
import OurTeam from "./pages/OurTeam";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import ForSchools from "./pages/ForSchools";
import InstitutionRegister from "./pages/InstitutionRegister";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0f172a",
                color: "#f8fafc",
                fontSize: "13px",
                fontWeight: "600",
                borderRadius: "16px",
                padding: "12px 16px",
              },
            }}
          />

          <Routes>
            {/* Website Pages WITH Header/Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/why-psychometric" element={<WhyChooseUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-details/:title" element={<ServiceDetail />} />
              <Route path="/our-blogs" element={<Blogs />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/our-blogs/:id" element={<BlogDetail />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Institutional & Pricing Modules */}
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/institution/plans" element={<Pricing />} />
              <Route path="/for-schools" element={<ForSchools />} />
              <Route path="/institution/register" element={<InstitutionRegister />} />

              {/* Assessment Discovery & Instructions */}
              <Route path="/tests" element={<TestsCatalog />} />
              <Route path="/test" element={<TestsCatalog />} />
              <Route path="/individual" element={<TestsCatalog />} />
              <Route path="/courses" element={<TestsCatalog />} />
              <Route path="/course" element={<TestsCatalog />} />
              <Route path="/test/:id/instructions" element={<TestInstruction />} />
              <Route path="/instruction" element={<TestsCatalog />} />

              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/upcoming-events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-up" element={<Register />} />

              {/* Protected Student Dashboard & Results */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test/results/:attemptId"
                element={
                  <ProtectedRoute>
                    <TestResult />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Test Taking Engine (NO Header/Footer - Protected) */}
            <Route
              element={
                <ProtectedRoute>
                  <TestExamLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/test/attempt/:attemptId" element={<TestRunner />} />
              <Route path="/question" element={<Navigate to="/tests" replace />} />
            </Route>

            {/* 404 Fallback */}
            <Route element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </SiteProvider>
  );
}
