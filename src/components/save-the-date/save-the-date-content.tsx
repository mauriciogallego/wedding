"use client";

import { Children, useEffect, useState } from "react";
import { Animation } from "./animation";
import { GuestAuthentication } from "./guest-authentication";
import { Stepper } from "@/components/shared/stepper/stepper";
import Confirmation from "./confirmation";
import { useAppContext } from "@/providers/app-context";

export const SaveTheDateContent = ({
  initialData,
}: {
  initialData: string[][];
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setSheetData } = useAppContext();

  useEffect(() => {
    setSheetData(initialData);
  }, [initialData, setSheetData]);

  const moveNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const steps = Children.toArray([
    <Animation animationEnded={moveNextStep} />,
    <GuestAuthentication moveNextStep={moveNextStep} />,
    <Confirmation />,
  ]);

  return <Stepper steps={steps} currentStep={currentStep} />;
};
