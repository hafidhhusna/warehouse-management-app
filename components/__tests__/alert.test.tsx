import React from "react";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

describe("Alert component", () => {
  it("renders default variant correctly", () => {
    render(
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success message</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("This is a success message")).toBeInTheDocument();
  });

  it("renders destructive variant correctly", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error message</AlertDescription>
      </Alert>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
  });
});
