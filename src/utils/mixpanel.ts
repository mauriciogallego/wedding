import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
let isInitialized = false;

export const initMixpanel = () => {
  if (typeof window !== "undefined" && MIXPANEL_TOKEN && !isInitialized) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === "development",
    });
    isInitialized = true;
  }
};

export const safeTrack = (event: string, props?: any) => {
  if (isInitialized) {
    mixpanel.track(event, props);
  }
};

export default mixpanel;
