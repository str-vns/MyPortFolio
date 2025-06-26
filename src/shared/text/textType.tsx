import React, { useEffect, useState } from "react";
import { useColorsTheme } from "../colors";
interface TextTypeProps {
  text: string;
  speed?: number;
}

const TextType: React.FC<TextTypeProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const colorsTheme = useColorsTheme();

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
    <div className={`border-b-2 font-mono text-xl`}
      style={{ borderColor: colorsTheme.NAVYBLUE, color: colorsTheme.SEMIBLACK }}>
      {displayedText}
      <span className="animate-pulse">|</span> 
    </div>
  );
};

export default TextType;