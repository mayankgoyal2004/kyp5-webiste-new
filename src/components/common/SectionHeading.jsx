import React from "react";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      }`}
    >
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 ${
            light
              ? "bg-white/10 text-indigo-200 border border-white/20"
              : "bg-indigo-50 text-indigo-700 border border-indigo-100"
          }`}
        >
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
