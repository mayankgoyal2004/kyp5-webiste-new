import apiClient from "./client";

export const studentApi = {
  // Auth
  register: (payload) => apiClient.post("student/auth/register", payload),
  verifyOtp: (payload) => apiClient.post("student/auth/verify-otp", payload),
  resendOtp: (payload) => apiClient.post("student/auth/resend-otp", payload),
  login: (payload) => apiClient.post("student/auth/login", payload),
  forgotPassword: (payload) => apiClient.post("student/auth/forgot-password", payload),
  resetPassword: (payload) => apiClient.post("student/auth/reset-password", payload),
  changePassword: (payload) => apiClient.post("student/auth/change-password", payload),
  getMe: () => apiClient.get("student/auth/me"),
  updateProfile: (payload) => apiClient.patch("student/auth/me", payload),
  logout: () => apiClient.post("student/auth/logout"),

  // Student Tests Dashboard
  getAvailableTests: (params) => apiClient.get("student/tests", { params }),
  getTestDetails: (id, lang = "en") => apiClient.get(`student/tests/${id}?lang=${lang}`),

  // Test Attempt Flow
  startAttempt: (testId, languageCode = "en") =>
    apiClient.post(`student/attempts/${testId}/start`, { languageCode }),
  
  getQuestions: (attemptId) =>
    apiClient.get(`student/attempts/${attemptId}/questions`),

  changeLanguage: (attemptId, languageCode) =>
    apiClient.patch(`student/attempts/${attemptId}/language`, { languageCode }),

  saveAnswer: (attemptId, { questionId, selectedOptionId, isMarkedForReview, timeTakenSeconds }) =>
    apiClient.post(`student/attempts/${attemptId}/save`, {
      questionId,
      selectedOptionId,
      isMarkedForReview,
      timeTakenSeconds,
    }),

  submitAttempt: (attemptId) =>
    apiClient.post(`student/attempts/${attemptId}/submit`),

  recordBrowserWarning: (attemptId) =>
    apiClient.post(`student/attempts/${attemptId}/browser-warning`),

  // Results & Reports
  getMyResults: (params) => apiClient.get("student/results", { params }),
  getResultById: (attemptId) => apiClient.get(`student/results/${attemptId}`),
};

export default studentApi;
