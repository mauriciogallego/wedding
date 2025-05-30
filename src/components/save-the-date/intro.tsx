"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGlitch } from "react-powerglitch";
import Typewriter from "typewriter-effect";
import Layout from "@/components/save-the-date/components/layout/layout";
import { Loading } from "@/components/shared/loading/loading";
import { safeTrack } from "@/utils/mixpanel";

const TOTAL_SEGMENT = 20;
const SEGMENT_COMPLETED = TOTAL_SEGMENT / 2.5;

interface IntroProps {
  animationEnded: () => void;
}

export const Intro = ({ animationEnded }: IntroProps) => {
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

  const executeTimer = useCallback(() => {
    intervalRef.current = window.setInterval(internalCallback, 700);
  }, [internalCallback]);

  useEffect(() => {
    executeTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [executeTimer]);

  useEffect(() => {
    safeTrack("Intro rendered");
  }, []);

  useEffect(() => {
    if (segments > SEGMENT_COMPLETED) {
      glitch.startGlitch();
      safeTrack("Glitch started");
      const cursor = document.querySelector(".Typewriter");
      if (cursor) {
        cursor.remove();
      }
      setTimeout(() => {
        animationEnded();
        safeTrack("Glitch ended");
      }, 2000);
    }
  }, [segments, glitch, animationEnded]);

  return (
    <Layout>
      <section
        ref={glitch.ref}
        className="flex flex-col justify-center text-center items-center w-[400px] space-y-2"
      >
        <Loading />

        <Image
          src="/assets/wedding.webp"
          alt="Wedding Save the Date"
          fill
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          quality={80}
          className="object-cover absolute w-full blur-sm -z-10"
        />
        {segments <= SEGMENT_COMPLETED && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(t("weddingNames"))
                  .callFunction((x) => {
                    x.elements.cursor.remove();
                  })
                  .start();
              }}
              options={{
                wrapperClassName:
                  "text-5xl font-whispering-signature font-light text-[#ffffff]",
                cursorClassName:
                  "text-5xl font-whispering-signature font-light text-[#ffffff]",
              }}
            />
          </div>
        )}
      </section>
    </Layout>
  );
};
