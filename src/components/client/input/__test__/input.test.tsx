import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../input";
import { UseFormRegisterReturn } from "react-hook-form";

describe("Input", () => {
  const mockRegister: UseFormRegisterReturn<string> = {
    name: "testField",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  };

  const defaultProps = {
    register: mockRegister,
    label: "Test Label",
    placeholder: "Test Placeholder",
  };

  it("renders with all required props", () => {
    render(<Input {...defaultProps} />);

    // Check if label is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Check if input is rendered with correct placeholder
    const input = screen.getByPlaceholderText("Test Placeholder");
    expect(input).toBeInTheDocument();
  });

  it("applies register props to input element", () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText("Test Placeholder");

    // Check if the input has the name attribute from register
    expect(input).toHaveAttribute("name", "testField");
  });

  it("renders the terminal icon", () => {
    render(<Input {...defaultProps} />);

    // Check if the SVG icon is rendered
    const svg = screen
      .getByText("Test Label")
      .closest("span")
      ?.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("stroke-width", "2");
    expect(svg).toHaveAttribute("stroke-linecap", "round");
    expect(svg).toHaveAttribute("stroke-linejoin", "round");
  });

  it("renders the blinking cursor", () => {
    render(<Input {...defaultProps} />);

    // Check if the blinking cursor is rendered using a more specific selector
    const cursor = screen.getByTestId("blinking-cursor");
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveClass(
      "absolute",
      "right-0",
      "top-1/2",
      "-translate-y-1/2",
      "w-2",
      "h-[15px]",
      "bg-[#ffffff]",
      "animate-[blink_1s_step-end_infinite]"
    );
  });
});
