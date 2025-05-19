// __tests__/input.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input component", () => {
  it("renders correctly with placeholder", () => {
    render(<Input placeholder="Enter your name" type="text" />);
    const input = screen.getByPlaceholderText(/enter your name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with given type", () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText(/enter email/i);
    expect(input).toHaveAttribute("type", "email");
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" type="text" />);
    const input = screen.getByPlaceholderText(/type here/i);
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input placeholder="Disabled input" disabled />);
    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDisabled();
  });
});
