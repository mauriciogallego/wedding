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
      duration: 1000,
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
    intervalRef.current = window.setInterval(internalCallback, 700);
  };

  useEffect(() => {
    executeTimer();
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
      }, 2000);
    }
  }, [segments, glitch, animationEnded]);

  return (
    <section className="flex flex-col justify-center text-center items-center w-[400px] space-y-2">
      <Image
        src="/assets/wedding.jpeg"
        alt="Wedding Save the Date"
        fill
        className="object-cover absolute w-full blur-sm opacity-30"
      />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(t("weddingEnter"))
              .deleteAll()
              .callFunction(() => {
                const cursor = document.querySelector(".Typewriter");
                if (cursor) {
                  cursor.remove();
                }
              })
              .start();
          }}
          options={{
            wrapperClassName: "text-xl font-mono font-bold text-[#ffffff]",
            cursorClassName: "text-xl font-mono font-thin text-[#ffffff]",
            autoStart: false,
            loop: false,
            deleteSpeed: 50,
            delay: 100,
          }}
        />
      </div>
      <div ref={glitch.ref}>
        <ProgressBar
          completedSegments={segments}
          totalSegments={TOTAL_SEGMENT}
        />
        <p className="text-[#ffffff] p-[15px] font-mono">loading..</p>
      </div>
    </section>
  );
};
