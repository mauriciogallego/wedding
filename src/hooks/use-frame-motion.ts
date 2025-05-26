import { useRef } from "react";
import { useInView } from "framer-motion";

export const useFrameMotion = () => {
  const weGotMarriedRef = useRef(null);
  const isWeGotMarriedInView = useInView(weGotMarriedRef, {
    once: true,
    amount: 0.6,
  });

  const formalInvitationRef = useRef(null);
  const isFormalInvitationInView = useInView(formalInvitationRef, {
    once: true,
    amount: 0.6,
  });

  const formQuestionRef = useRef(null);
  const isFormQuestionInView = useInView(formQuestionRef, {
    once: true,
    amount: 0.6,
  });

  return {
    weGotMarriedRef,
    isWeGotMarriedInView,
    formalInvitationRef,
    isFormalInvitationInView,
    formQuestionRef,
    isFormQuestionInView,
  };
};
