import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import { Animation } from "../animation";
import { useTranslation } from "react-i18next";
import { useGlitch } from "react-powerglitch";

// Mock the react-i18next hook
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

// Mock the react-powerglitch hook
jest.mock("react-powerglitch", () => ({
  useGlitch: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

interface TypewriterProps {
  onInit: (typewriter: { callFunction: (fn: () => void) => void }) => void;
  options: {
    strings: string[];
    autoStart: boolean;
    loop: boolean;
    deleteSpeed: number;
    delay: number;
    typeSpeed: number;
    wrapperClassName: string;
    cursorClassName: string;
  };
}

// Mock the typewriter-effect component
jest.mock("typewriter-effect", () => {
  return function MockTypewriter({ onInit, options }: TypewriterProps) {
    // Call onInit immediately instead of using useEffect
    onInit({
      callFunction: (fn: () => void) => fn(),
    });

    return <div data-testid="typewriter">{options.strings[0]}</div>;
  };
});

describe("Animation", () => {
  const mockStartGlitch = jest.fn();
  const mockAnimationEnded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup translation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    // Setup glitch mock
    (useGlitch as jest.Mock).mockReturnValue({
      ref: { current: null },
      startGlitch: mockStartGlitch,
    });
    // Mock window.setInterval
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders Typewriter initially", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();
  });

  it("transitions to ProgressBar after Typewriter initialization", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Initially shows Typewriter
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();

    // Fast-forward timers to trigger segment updates
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should now show ProgressBar
    expect(screen.getByText("loading..")).toBeInTheDocument();
  });

  it("shows image when segments start incrementing", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const image = screen.getByAltText("Wedding Save the Date");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/wedding.jpeg");
  });

  it("triggers glitch effect when segments reach halfway", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Fast-forward to just over half of TOTAL_SEGMENT
    act(() => {
      for (let i = 0; i <= 11; i++) {
        jest.advanceTimersByTime(500);
      }
    });

    expect(mockStartGlitch).toHaveBeenCalled();
  });

  it("calls animationEnded when segments complete", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Fast-forward past SEGMENT_COMPLETED
    act(() => {
      for (let i = 0; i <= 11; i++) {
        jest.advanceTimersByTime(500);
      }
    });

    // Wait for the timeout that triggers animationEnded
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(mockAnimationEnded).toHaveBeenCalledWith(true);
  });

  it("cleans up interval on unmount", () => {
    const { unmount } = render(
      <Animation animationEnded={mockAnimationEnded} />
    );

    // Start the interval
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Unmount the component
    unmount();

    // Advance timer again
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Check that no more segments were added after unmount
    expect(mockAnimationEnded).not.toHaveBeenCalled();
  });
});
