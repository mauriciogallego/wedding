'use client';

import Typewriter from 'typewriter-effect';

interface TypewriterClientProps {
  strings: string[];
}

export default function TypewriterClient({ strings }: TypewriterClientProps) {
  return (
    <Typewriter
      options={{
        wrapperClassName:'text-9xl font-bold',
        strings,
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
      }}
    />
  );
} 