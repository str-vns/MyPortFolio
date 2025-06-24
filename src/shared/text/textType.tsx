import React, { useEffect, useState } from "react";

interface TextTypeProps {
  text: string;
  speed?: number;
}

const TextType: React.FC<TextTypeProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <div className="border-b-2 border-blue-500 font-mono text-xl">
      {displayedText}
      <span className="animate-pulse">|</span> {/* blinking cursor */}
    </div>
  );
};

export default TextType;