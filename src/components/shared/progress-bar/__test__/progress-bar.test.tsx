import { render, screen } from "@testing-library/react";
import ProgressBar from "../progress-bar";

describe("ProgressBar", () => {
  it("renders with default props", () => {
    render(<ProgressBar />);
    const segments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("flex-1"));

    expect(segments).toHaveLength(5); // default totalSegments
    expect(
      segments.filter((segment) => segment.className.includes("bg-[#ffffff]"))
    ).toHaveLength(2); // default completedSegments
  });

  it("renders with custom props", () => {
    render(<ProgressBar completedSegments={3} totalSegments={4} />);
    const segments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("flex-1"));

    expect(segments).toHaveLength(4);
    expect(
      segments.filter((segment) => segment.className.includes("bg-[#ffffff]"))
    ).toHaveLength(3);
  });

  it("applies correct styles to completed and incomplete segments", () => {
    render(<ProgressBar completedSegments={2} totalSegments={3} />);
    const segments = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("flex-1"));

    // Check completed segments
    expect(segments[0]).toHaveClass("bg-[#ffffff]");
    expect(segments[1]).toHaveClass("bg-[#ffffff]");

    // Check incomplete segment
    expect(segments[2]).toHaveClass("bg-transparent");
  });
});
