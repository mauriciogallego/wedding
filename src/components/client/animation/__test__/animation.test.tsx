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

// Mock the typewriter-effect component
jest.mock("typewriter-effect", () => {
  return function MockTypewriter({ onInit, options }: any) {
    // Call onInit immediately to simulate the typewriter initialization
    onInit({
      typeString: () => ({
        deleteAll: () => ({
          callFunction: (fn: () => void) => {
            fn();
            return { start: () => {} };
          },
        }),
      }),
    });

    return <div data-testid="typewriter">{options.wrapperClassName}</div>;
  };
});

describe("Animation", () => {
  const mockStartGlitch = jest.fn();
  const mockAnimationEnded = jest.fn();
  const mockRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup translation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    // Setup glitch mock
    (useGlitch as jest.Mock).mockReturnValue({
      ref: mockRef,
      startGlitch: mockStartGlitch,
    });
    // Mock window.setInterval
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders the component with initial elements", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Check if the image is rendered
    const image = screen.getByAltText("Wedding Save the Date");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/wedding.jpeg");

    // Check if the typewriter is rendered
    expect(screen.getByTestId("typewriter")).toBeInTheDocument();

    // Check if the progress bar container is rendered
    expect(screen.getByText("loading..")).toBeInTheDocument();
  });

  it("increments segments over time", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Initially segments should be 0
    const initialSegments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("bg-[#ffffff]"));
    expect(initialSegments).toHaveLength(0);

    // Advance time to see segments increment
    act(() => {
      jest.advanceTimersByTime(700);
    });

    const updatedSegments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("bg-[#ffffff]"));
    expect(updatedSegments.length).toBeGreaterThan(0);
  });

  it("triggers glitch effect when segments reach threshold", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Advance time past the threshold (SEGMENT_COMPLETED = 8)
    act(() => {
      for (let i = 0; i < 9; i++) {
        jest.advanceTimersByTime(700);
      }
    });

    expect(mockStartGlitch).toHaveBeenCalled();
  });

  it("calls animationEnded after glitch effect", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Advance time past the threshold
    act(() => {
      for (let i = 0; i < 9; i++) {
        jest.advanceTimersByTime(700);
      }
    });

    // Wait for the timeout that triggers animationEnded
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockAnimationEnded).toHaveBeenCalled();
  });

  it("cleans up interval on unmount", () => {
    const { unmount } = render(
      <Animation animationEnded={mockAnimationEnded} />
    );

    // Start the interval
    act(() => {
      jest.advanceTimersByTime(700);
    });

    // Unmount the component
    unmount();

    // Advance timer again
    act(() => {
      jest.advanceTimersByTime(700);
    });

    // Check that no more segments were added after unmount
    expect(mockAnimationEnded).not.toHaveBeenCalled();
  });

  it("stops incrementing segments after reaching threshold", () => {
    render(<Animation animationEnded={mockAnimationEnded} />);

    // Advance time past the threshold
    act(() => {
      for (let i = 0; i < 9; i++) {
        jest.advanceTimersByTime(700);
      }
    });

    // Get the number of segments at threshold
    const segmentsAtThreshold = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("bg-[#ffffff]")).length;

    // Advance time further
    act(() => {
      jest.advanceTimersByTime(700);
    });

    // Check that segments haven't increased
    const segmentsAfterThreshold = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("bg-[#ffffff]")).length;

    expect(segmentsAfterThreshold).toBe(segmentsAtThreshold);
  });
});
