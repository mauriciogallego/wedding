"use client";

import { Children, useState } from "react";
import { Animation } from "./animation";
import { GuestAuthentication } from "./guest-authentication";
import { Stepper } from "@/components/shared/stepper/stepper";

export const SaveTheDateContent = ({ data }: { data: string[][] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const moveNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const steps = Children.toArray([
    <Animation animationEnded={moveNextStep} />,
    <GuestAuthentication data={data} moveNextStep={moveNextStep} />,
  ]);

  return <Stepper steps={steps} currentStep={currentStep} />;
};
