import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: JSX.Element;
  animateControl: any;
}

const Fade: React.FC<Props> = ({ children, animateControl }) => {
  return (
    <AnimatePresence>
      <motion.div animate={animateControl}>{children}</motion.div>
    </AnimatePresence>
  );
};

export default Fade;
