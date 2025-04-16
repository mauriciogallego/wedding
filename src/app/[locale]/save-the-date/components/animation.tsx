"use client";

import Image from "next/image";
import ProgressBar from "@/components/client/progress-bar/progress-bar";
import { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGlitch } from "react-powerglitch";
import Typewriter from "typewriter-effect";

const TOTAL_SEGMENT = 20;
const SEGMENT_COMPLETED = TOTAL_SEGMENT / 2.5;

interface AnimationProps {
  animationEnded: (value: boolean) => void;
}

export const Animation = ({ animationEnded }: AnimationProps) => {
  const { t } = useTranslation();
  const glitch = useGlitch({
    playMode: "manual",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 3000,
      iterations: 3,
    },
    glitchTimeSpan: {
      start: 0,
      end: 1,
    },
  });
  const intervalRef = useRef<number | null>(null);
  const [segments, setSegments] = useState(0);

  const internalCallback = useCallback(() => {
    setSegments((prevSegments) => {
      if (prevSegments > SEGMENT_COMPLETED) {
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
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (segments > SEGMENT_COMPLETED) {
      glitch.startGlitch();
      setTimeout(() => {
        animationEnded(true);
      }, 4000);
    }
  }, [segments, glitch, animationEnded]);

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
            delay: 80,
          }}
        />
      ) : (
        <>
          <Image
            src="/assets/wedding.jpeg" // Replace with your image path
            alt="Wedding Save the Date"
            fill
            className="object-cover absolute w-full blur-sm opacity-30"
          />
          <div ref={glitch.ref} className="!w-full">
            <ProgressBar
              completedSegments={segments}
              totalSegments={TOTAL_SEGMENT}
            />
            <p className="text-white p-[15px] font-mono">loading..</p>
          </div>
        </>
      )}
    </div>
  );
};
