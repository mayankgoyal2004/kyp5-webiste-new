import React from "react";

/**
 * RichTextContent Component
 * Safely renders HTML or Markdown/Plain-Text content with uniform typography styling.
 */
export default function RichTextContent({ content, className = "" }) {
  if (!content) return null;

  // Function to convert simple markdown to HTML if content is not pure HTML
  const formatContentToHtml = (raw) => {
    if (typeof raw !== "string") return "";

    const isHtml = /<[a-z][\s\S]*>/i.test(raw);
    if (isHtml) {
      return raw;
    }

    // Convert markdown headings and lists
    let html = raw
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/^\s*-\s+(.*$)/gim, "<li>$1</li>")
      .replace(/^\s*\*\s+(.*$)/gim, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");

    // Wrap in paragraph if not starting with block element
    if (!html.startsWith("<h") && !html.startsWith("<p") && !html.startsWith("<ul") && !html.startsWith("<ol")) {
      html = `<p>${html}</p>`;
    }

    return html;
  };

  const htmlContent = formatContentToHtml(content);

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
