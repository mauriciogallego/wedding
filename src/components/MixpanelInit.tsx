"use client";
import { useEffect } from "react";
import { initMixpanel } from "@/utils/mixpanel";

export default function MixpanelInit() {
  useEffect(() => {
    initMixpanel();
  }, []);
  return null;
}
