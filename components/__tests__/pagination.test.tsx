// __tests__/pagination.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

describe("Pagination component", () => {
  it("renders navigation with role", () => {
    render(<Pagination data-testid="pagination" />);
    const nav = screen.getByTestId("pagination");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("role", "navigation");
    expect(nav).toHaveAttribute("aria-label", "pagination");
  });

  it("renders previous and next buttons", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByLabelText(/go to previous page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/go to next page/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it("renders active page link correctly", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink isActive href="#">
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const pageLink = screen.getByRole("link", { name: "1" });
    expect(pageLink).toBeInTheDocument();
    expect(pageLink).toHaveAttribute("aria-current", "page");
  });

  it("renders ellipsis", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByText(/more pages/i)).toBeInTheDocument();
  });
});
