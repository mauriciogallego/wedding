import { render, screen } from "@testing-library/react";
import { Stepper } from "./stepper";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("Stepper", () => {
  const mockSteps = [
    <div key="step1">Step 1 Content</div>,
    <div key="step2">Step 2 Content</div>,
    <div key="step3">Step 3 Content</div>,
  ];

  it("renders the current step content", () => {
    render(<Stepper steps={mockSteps} currentStep={0} />);
    expect(screen.getByText("Step 1 Content")).toBeInTheDocument();
  });

  it("changes content when currentStep changes", () => {
    const { rerender } = render(<Stepper steps={mockSteps} currentStep={0} />);
    expect(screen.getByText("Step 1 Content")).toBeInTheDocument();

    rerender(<Stepper steps={mockSteps} currentStep={1} />);
    expect(screen.getByText("Step 2 Content")).toBeInTheDocument();
  });

  it("renders the last step when currentStep is at the end", () => {
    render(<Stepper steps={mockSteps} currentStep={2} />);
    expect(screen.getByText("Step 3 Content")).toBeInTheDocument();
  });
});
