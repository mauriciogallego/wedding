"use client";

import ProgressBar from "@/components/client/progress-bar/__test__/progress-bar";
import { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

const TOTAL_SEGMENT = 20;

export const Animation = () => {
  const { t } = useTranslation();
  const intervalRef = useRef<number | null>(null);
  const [segments, setSegments] = useState(0);

  const internalCallback = useCallback(() => {
    setSegments((prevSegments) => {
      if (prevSegments > TOTAL_SEGMENT / 3) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return prevSegments;
      } else {
        return prevSegments + 1;
      }
    });
  }, []);

  const executeTimer = () => {
    intervalRef.current = window.setInterval(internalCallback, 500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center text-center items-center w-[300px]">
      {!segments ? (
        <Typewriter
          onInit={(typewriter) => {
            typewriter.callFunction(executeTimer);
          }}
          options={{
            wrapperClassName: "text-7xl font-bold",
            cursorClassName: "text-7xl font-thin",
            strings: [t("weddingEnter")],
            autoStart: true,
            loop: false,
            deleteSpeed: 50,
          }}
        />
      ) : (
        <ProgressBar
          completedSegments={segments}
          totalSegments={TOTAL_SEGMENT}
        />
      )}
    </div>
  );
};
