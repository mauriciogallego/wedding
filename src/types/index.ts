import { TargetAndTransition, Transition } from "framer-motion";

export interface AnimationConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
}
