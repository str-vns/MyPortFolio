import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const FadeRight = ({
  currentItems,
  currentPage,
}: {
  currentItems: React.ReactNode[];
  currentPage: number;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`page-${currentPage}`} // ✅ helps AnimatePresence trigger correctly
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}

      >
        {currentItems.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeRight;

