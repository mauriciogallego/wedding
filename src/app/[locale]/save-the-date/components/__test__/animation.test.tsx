import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Animation } from "./animation";
import { useTranslation } from "react-i18next";

// Mock the react-i18next hook
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

interface TypewriterProps {
  onInit: (typewriter: { callFunction: (fn: () => void) => void }) => void;
  options: {
    strings: string[];
  };
}

// Mock the typewriter-effect component
jest.mock("typewriter-effect", () => {
  const MockTypewriter = ({ onInit, options }: TypewriterProps) => {
    // Simulate the typewriter initialization
    onInit({
      callFunction: (fn: () => void) => fn(),
    });

    return <div data-testid="typewriter">{options.strings[0]}</div>;
  };

  return MockTypewriter;
});

describe("Animation", () => {
  beforeEach(() => {
    // Setup translation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    // Mock window.setInterval
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders Typewriter initially", () => {
    render(<Animation />);
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();
  });

  it("transitions to ProgressBar after Typewriter initialization", () => {
    render(<Animation />);

    // Initially shows Typewriter
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();

    // Fast-forward timers to trigger segment updates
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should now show ProgressBar with 1 segment
    const segments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("flex-1"));
    expect(segments).toHaveLength(20); // TOTAL_SEGMENT
    expect(
      segments.filter((segment) => segment.className.includes("bg-green-500"))
    ).toHaveLength(1);
  });

  it("stops incrementing segments after reaching TOTAL_SEGMENT/3", () => {
    render(<Animation />);

    // Fast-forward to just before the limit
    act(() => {
      for (let i = 0; i < 6; i++) {
        // TOTAL_SEGMENT/3 = 20/3 ≈ 6
        jest.advanceTimersByTime(500);
      }
    });

    const segments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("flex-1"));
    expect(
      segments.filter((segment) => segment.className.includes("bg-green-500"))
    ).toHaveLength(6);

    // Fast-forward more
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should still have 6 segments
    expect(
      segments.filter((segment) => segment.className.includes("bg-green-500"))
    ).toHaveLength(7);
  });
});
