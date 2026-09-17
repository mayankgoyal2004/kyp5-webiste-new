import React from "react";
import { CheckCircle2, Bookmark, HelpCircle } from "lucide-react";

export default function QuestionPalette({
  questions = [],
  currentIndex = 0,
  userAnswers = {},
  onSelectQuestion,
}) {
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.selectedOptionId && !userAnswers[k]?.isMarkedForReview
  ).length;

  const markedCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.isMarkedForReview && !userAnswers[k]?.selectedOptionId
  ).length;

  const markedAnsweredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.isMarkedForReview && userAnswers[k]?.selectedOptionId
  ).length;

  const notAnsweredCount = questions.length - (answeredCount + markedCount + markedAnsweredCount);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h4 className="font-extrabold text-sm text-[#0f172a]">Question Palette</h4>
        <span className="text-xs text-[#1b93ad] font-bold bg-cyan-50 border border-cyan-100/80 px-3 py-1 rounded-full">
          {answeredCount + markedAnsweredCount} / {questions.length} Attempted
        </span>
      </div>

      {/* 4 Stat Breakdown Items */}
      <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
        {/* Answered */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-emerald-50/90 text-emerald-800 border border-emerald-200/60">
          <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
            {answeredCount}
          </span>
          <span className="text-[11px] leading-tight font-extrabold text-emerald-900">Answered</span>
        </div>

        {/* Marked Review */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-purple-50/90 text-purple-800 border border-purple-200/60">
          <span className="w-6 h-6 rounded-lg bg-purple-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
            {markedCount}
          </span>
          <span className="text-[11px] leading-tight font-extrabold text-purple-900">Marked Review</span>
        </div>

        {/* Marked & Answered */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-amber-50/90 text-amber-800 border border-amber-200/60">
          <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
            {markedAnsweredCount}
          </span>
          <span className="text-[11px] leading-tight font-extrabold text-amber-900">Marked & Answered</span>
        </div>

        {/* Not Answered */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200/80">
          <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
            {Math.max(0, notAnsweredCount)}
          </span>
          <span className="text-[11px] leading-tight font-extrabold text-slate-800">Not Answered</span>
        </div>
      </div>

      {/* Number Buttons Grid with Generous Padding */}
      <div className="pt-3 border-t border-slate-100">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          Questions
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {questions.map((q, idx) => {
            const ans = userAnswers[q.id];
            const hasOption = !!ans?.selectedOptionId;
            const isReview = !!ans?.isMarkedForReview;
            const isCurrent = idx === currentIndex;

            let btnStateClasses = "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";

            if (hasOption && isReview) {
              btnStateClasses = "bg-amber-500 text-white border-amber-600 shadow-sm font-black";
            } else if (hasOption) {
              btnStateClasses = "bg-emerald-500 text-white border-emerald-600 shadow-sm font-black";
            } else if (isReview) {
              btnStateClasses = "bg-purple-500 text-white border-purple-600 shadow-sm font-black";
            }

            const currentActiveRing = isCurrent ? "ring-2 ring-[#1b93ad] ring-offset-2 scale-105 font-black z-10" : "hover:scale-102";

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(idx)}
                className={`h-10 w-full rounded-2xl border text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center cursor-pointer ${btnStateClasses} ${currentActiveRing}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
