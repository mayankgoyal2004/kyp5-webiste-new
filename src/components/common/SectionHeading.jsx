import React from "react";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200 mb-3 shadow-2xs">
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
