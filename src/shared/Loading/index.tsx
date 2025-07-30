import { motion } from "framer-motion";
import { useDarkMode } from "@_/stores/useDarkMode";

interface LoadingTextProps {
  text: string;
}

export default function LoadingText({ text }: LoadingTextProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <p
        className={`text-[30px] font-semibold text-center leading-relaxed ${
          isDarkMode ? "text-[#FFDEDE]" : "text-[#123458]"
        }`}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.08,
              repeatType: "loop",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
