import { AnimationConfig } from "@/types";

export const defaultStepperAnimation: AnimationConfig = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
};
