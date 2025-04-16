"use client";

import { useState } from "react";
import { Animation } from "./animation";
import { GuestForm } from "./guest-form";

export const SaveTheDateContent = () => {
  const [animation, setAnimation] = useState(false);

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center">
      {animation ? <GuestForm /> : <Animation animationEnded={setAnimation} />}
    </main>
  );
};
