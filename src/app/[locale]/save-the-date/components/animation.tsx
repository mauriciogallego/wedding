"use client";

import ProgressBar from "@/components/client/progress-bar/progress-bar";
import { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGlitch } from "react-powerglitch";
import Typewriter from "typewriter-effect";

const TOTAL_SEGMENT = 20;

interface AnimationProps {
  animationEnded: (value: boolean) => void;
}

export const Animation = ({ animationEnded }: AnimationProps) => {
  const { t } = useTranslation();
  const glitch = useGlitch();
  const intervalRef = useRef<number | null>(null);
  const [segments, setSegments] = useState(0);

  const internalCallback = useCallback(() => {
    setSegments((prevSegments) => {
      if (prevSegments > TOTAL_SEGMENT / 3) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          animationEnded(true);
        }
        return prevSegments;
      } else {
        return prevSegments + 1;
      }
    });
  }, [animationEnded]);

  const executeTimer = () => {
    intervalRef.current = window.setInterval(internalCallback, 500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex justify-center text-center items-center w-[400px]">
      {!segments ? (
        <Typewriter
          onInit={(typewriter) => {
            typewriter.callFunction(executeTimer);
          }}
          options={{
            wrapperClassName: "text-7xl font-mono font-bold",
            cursorClassName: "text-7xl font-mono font-thin",
            strings: [t("weddingEnter")],
            autoStart: true,
            loop: false,
            deleteSpeed: 50,
          }}
        />
      ) : (
        <div ref={glitch.ref} className="!w-full">
          <ProgressBar
            completedSegments={segments}
            totalSegments={TOTAL_SEGMENT}
          />
        </div>
      )}
    </div>
  );
};
