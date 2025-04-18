import { defaultStepperAnimation } from "@/config/animations/stepper";
import { motion, AnimatePresence } from "framer-motion";

interface StepperProps {
  steps: React.ReactNode[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={defaultStepperAnimation.initial}
        animate={defaultStepperAnimation.animate}
        exit={defaultStepperAnimation.exit}
        transition={defaultStepperAnimation.transition}
      >
        {steps[currentStep]}
      </motion.div>
    </AnimatePresence>
  );
};
