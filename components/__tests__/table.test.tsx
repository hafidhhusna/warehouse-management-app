// __tests__/table.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

describe("Table component", () => {
  it("renders a table with caption, header, body, and footer", () => {
    render(
      <Table>
        <TableCaption>Sample Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByText("Sample Caption")).toBeInTheDocument();
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
    expect(screen.getByText("Footer 1")).toBeInTheDocument();
    expect(screen.getByText("Footer 2")).toBeInTheDocument();
  });

  it("renders rows and cells correctly", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1 Cell 1</TableCell>
            <TableCell>Row 1 Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2 Cell 1</TableCell>
            <TableCell>Row 2 Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Row 1 Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Row 2 Cell 2")).toBeInTheDocument();
  });
});
