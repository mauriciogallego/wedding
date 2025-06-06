"use client";

import { Children, useEffect, useState } from "react";
import { Intro } from "./intro";
import { GuestAuthentication } from "./guest-authentication";
import { Stepper } from "@/components/shared/stepper/stepper";
import Confirmation from "./confirmation";
import { useAppContext } from "@/providers/app-context";

type Props = {
  initialData: {
    name: string;
    plusOne: string;
    children: string;
    companions: string;
    invitationName: string;
    totalPeople: number;
    row: number;
  }[];
};

export const SaveTheDateContent = ({ initialData }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setSheetData } = useAppContext();

  useEffect(() => {
    setSheetData(initialData);
  }, [initialData, setSheetData]);

  const moveNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const steps = Children.toArray([
    <Intro animationEnded={moveNextStep} />,
    <GuestAuthentication moveNextStep={moveNextStep} />,
    <Confirmation />,
  ]);

  return <Stepper steps={steps} currentStep={currentStep} />;
};
