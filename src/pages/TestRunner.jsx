import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Send,
  AlertTriangle,
  Languages,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ShieldAlert
} from "lucide-react";
import studentApi from "../api/studentApi";
import TestTimer from "../components/assessment/TestTimer";
import QuestionPalette from "../components/assessment/QuestionPalette";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";

export default function TestRunner() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [testInfo, setTestInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingAnswer, setSavingAnswer] = useState(false);

  // Anti-cheat tab switch tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        studentApi.recordBrowserWarning(attemptId).catch(() => {});
        toast.error("Window switch detected! Please stay on the assessment tab.", {
          icon: "⚠️",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [attemptId]);

  // Load Question Paper & Existing Answers
  const loadQuestionPaper = useCallback(async () => {
    try {
      setLoading(true);
      const res = await studentApi.getQuestions(attemptId);
      if (res && res.data) {
        const { test, questions: qList, userAnswers: ansList } = res.data;
        setTestInfo(test);
        setQuestions(qList || []);
        setSelectedLanguage(test?.selectedLanguage || "en");

        // Format answers into map: { [questionId]: { selectedOptionId, isMarkedForReview, ... } }
        const ansMap = {};
        (ansList || []).forEach((a) => {
          ansMap[a.questionId] = a;
        });
        setUserAnswers(ansMap);
      }
    } catch (err) {
      toast.error(err.message || "Failed to load examination.");
      navigate("/tests");
    } finally {
      setLoading(false);
    }
  }, [attemptId, navigate]);

  useEffect(() => {
    loadQuestionPaper();
  }, [loadQuestionPaper]);

  // Handle Option Select & Real-Time Auto-Save
  const handleSelectOption = async (optionId) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    const previousAns = userAnswers[currentQuestion.id];
    const isSame = previousAns?.selectedOptionId === optionId;
    const newSelected = isSame ? null : optionId; // toggle

    // Optimistic UI update
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOptionId: newSelected,
        isAnswered: !!newSelected,
      },
    }));

    try {
      setSavingAnswer(true);
      await studentApi.saveAnswer(attemptId, {
        questionId: currentQuestion.id,
        selectedOptionId: newSelected,
        isMarkedForReview: previousAns?.isMarkedForReview || false,
        timeTakenSeconds: 5,
      });
    } catch (err) {
      console.error("Auto-save failed:", err.message);
    } finally {
      setSavingAnswer(false);
    }
  };

  // Toggle Mark For Review
  const handleToggleReview = async () => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    const previousAns = userAnswers[currentQuestion.id];
    const nextReview = !previousAns?.isMarkedForReview;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isMarkedForReview: nextReview,
      },
    }));

    try {
      await studentApi.saveAnswer(attemptId, {
        questionId: currentQuestion.id,
        selectedOptionId: previousAns?.selectedOptionId || null,
        isMarkedForReview: nextReview,
        timeTakenSeconds: 2,
      });
    } catch (err) {
      console.error("Failed to mark review:", err.message);
    }
  };

  // Handle Live Language Change
  const handleLanguageChange = async (langCode) => {
    try {
      setSelectedLanguage(langCode);
      await studentApi.changeLanguage(attemptId, langCode);
      await loadQuestionPaper();
      toast.success("Question language updated.");
    } catch (err) {
      toast.error(err.message || "Failed to switch language.");
    }
  };

  // Final Submit Handler
  const handleSubmitExam = async () => {
    try {
      setSubmitting(true);
      const res = await studentApi.submitAttempt(attemptId);
      setShowSubmitModal(false);
      toast.success("Assessment submitted successfully!");
      navigate(`/test/results/${attemptId}`);
    } catch (err) {
      toast.error(err.message || "Could not submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500">Loading exam environment...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : null;

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.selectedOptionId
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Test Control Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold text-[#1b93ad] uppercase tracking-wider bg-cyan-50 border border-cyan-100/80 px-3 py-1 rounded-full">
            Active Assessment
          </span>
          <h2 className="text-base sm:text-xl font-black text-[#0f172a] mt-1.5">
            {testInfo?.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-bold">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Countdown Timer */}
          {testInfo?.expiresAt && (
            <TestTimer
              expiresAt={testInfo.expiresAt}
              onTimeExpired={handleSubmitExam}
            />
          )}

          {/* Submit Action Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-1.5 bg-[#2995ac] hover:bg-[#207f94] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish Test</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Question Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {/* Question Meta Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-black text-[#1b93ad] bg-cyan-50 border border-cyan-100/60 px-3.5 py-1.5 rounded-xl">
              Question {currentIndex + 1} of {questions.length}
            </span>

            <button
              onClick={handleToggleReview}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentAnswer?.isMarkedForReview
                  ? "bg-purple-100 text-purple-700 border border-purple-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{currentAnswer?.isMarkedForReview ? "Marked for Review" : "Mark Review"}</span>
            </button>
          </div>

          {/* Question Text */}
          {currentQuestion && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-[#0f172a] leading-relaxed">
                {currentQuestion.text}
              </h3>

              {currentQuestion.imageUrl && (
                <div className="max-w-md rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Question Graphic"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options?.map((opt, i) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-cyan-50/90 border-[#1b93ad] text-cyan-950 shadow-xs ring-1 ring-[#1b93ad]"
                          : "bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#1b93ad] text-white"
                              : "bg-white border border-slate-300 text-slate-600"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </div>

                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#1b93ad] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question Nav Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {savingAnswer && (
              <span className="text-[11px] font-bold text-[#1b93ad] animate-pulse">
                Saving answer...
              </span>
            )}

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Question Palette Grid */}
        <div className="lg:col-span-4 space-y-4">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Ready to Submit Assessment?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-700">
              <span>Total Questions:</span>
              <span>{questions.length}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-700">
              <span>Answered:</span>
              <span>{answeredCount}</span>
            </div>
            <div className="flex justify-between font-bold text-amber-700">
              <span>Unanswered / Pending:</span>
              <span>{questions.length - answeredCount}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Once submitted, your responses will be locked and our psychometric engine will compute your RIASEC profile and generate your career report.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Review More
            </button>
            <button
              onClick={handleSubmitExam}
              disabled={submitting}
              className="bg-[#2995ac] hover:bg-[#207f94] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              {submitting ? "Submitting..." : "Yes, Submit Exam"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
