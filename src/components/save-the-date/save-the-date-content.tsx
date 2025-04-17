"use client";

import { Children, useState } from "react";
import { Animation } from "../client/animation/animation";
import { GuestForm } from "./guest-form";
import { Stepper } from "@/components/client/stepper/stepper";

export const SaveTheDateContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const moveNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const steps = Children.toArray([
    <Animation animationEnded={moveNextStep} />,
    <GuestForm />,
  ]);

  return <Stepper steps={steps} currentStep={currentStep} />;
};
