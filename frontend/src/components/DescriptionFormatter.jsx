import React from "react";

const DescriptionFormatter = ({
  description,
  className = "",
  maxLines = null,
}) => {
  if (!description) return null;

  // Function to parse markdown-style formatting
  const parseFormatting = (text) => {
    // Convert text to JSX elements with formatting
    const parts = [];
    let currentIndex = 0;

    // Regex patterns for different formatting
    const patterns = [
      { pattern: /\*\*(.*?)\*\*/g, component: "bold" }, // **bold**
      { pattern: /\*(.*?)\*/g, component: "italic" }, // *italic*
      { pattern: /`(.*?)`/g, component: "code" }, // `code`
      { pattern: /__(.*?)__/g, component: "underline" }, // __underline__
      { pattern: /~~(.*?)~~/g, component: "strikethrough" }, // ~~strikethrough~~
    ];

    let workingText = text;
    const replacements = [];

    // Find all matches and their positions
    patterns.forEach((patternObj, patternIndex) => {
      let match;
      const regex = new RegExp(patternObj.pattern.source, "g");

      while ((match = regex.exec(text)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          content: match[1],
          type: patternObj.component,
          fullMatch: match[0],
        });
      }
    });

    // Sort replacements by start position
    replacements.sort((a, b) => a.start - b.start);

    // Remove overlapping matches (keep the first one)
    const validReplacements = [];
    for (let i = 0; i < replacements.length; i++) {
      const current = replacements[i];
      let isValid = true;

      for (let j = 0; j < validReplacements.length; j++) {
        const existing = validReplacements[j];
        if (
          (current.start >= existing.start && current.start < existing.end) ||
          (current.end > existing.start && current.end <= existing.end)
        ) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        validReplacements.push(current);
      }
    }

    // Build the formatted JSX
    let lastEnd = 0;
    const elements = [];

    validReplacements.forEach((replacement, index) => {
      // Add text before this replacement
      if (replacement.start > lastEnd) {
        elements.push(text.slice(lastEnd, replacement.start));
      }

      // Add formatted element
      const key = `format-${index}`;
      switch (replacement.type) {
        case "bold":
          elements.push(
            <strong key={key} className="font-bold text-gray-800">
              {replacement.content}
            </strong>
          );
          break;
        case "italic":
          elements.push(
            <em key={key} className="italic text-gray-700">
              {replacement.content}
            </em>
          );
          break;
        case "code":
          elements.push(
            <code
              key={key}
              className="bg-gray-100 text-orange-600 px-2 py-1 rounded font-mono text-sm"
            >
              {replacement.content}
            </code>
          );
          break;
        case "underline":
          elements.push(
            <u key={key} className="underline text-gray-800">
              {replacement.content}
            </u>
          );
          break;
        case "strikethrough":
          elements.push(
            <s key={key} className="line-through text-gray-500">
              {replacement.content}
            </s>
          );
          break;
        default:
          elements.push(replacement.content);
      }

      lastEnd = replacement.end;
    });

    // Add remaining text
    if (lastEnd < text.length) {
      elements.push(text.slice(lastEnd));
    }

    return elements.length > 0 ? elements : [text];
  };

  // Split description by line breaks and format each line
  const formatDescription = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, index) => (
        <p key={index} className="mb-3 last:mb-0">
          {parseFormatting(line)}
        </p>
      ));
  };

  return (
    <div className={`text-gray-600 leading-relaxed ${className}`}>
      {formatDescription(description)}
    </div>
  );
};

export default DescriptionFormatter;
