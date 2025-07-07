import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Interest Calculator", () => {
  test("renders interest calculator with all form elements", () => {
    render(<App />);

    expect(screen.getByText("Interest Calculator")).toBeInTheDocument();
    expect(screen.getByLabelText(/principal amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time period/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest type/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate interest/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset all/i })
    ).toBeInTheDocument();
  });

  test("shows compound frequency field when compound interest is selected", () => {
    render(<App />);

    const interestTypeSelect = screen.getByLabelText(/interest type/i);
    fireEvent.change(interestTypeSelect, { target: { value: "compound" } });

    expect(screen.getByLabelText(/compounding frequency/i)).toBeInTheDocument();
  });

  test("calculates simple interest correctly", async () => {
    render(<App />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/principal amount/i), {
      target: { value: "10000" },
    });
    fireEvent.change(screen.getByLabelText(/monthly interest rate/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/time period/i), {
      target: { value: "12" },
    });

    // Calculate
    fireEvent.click(
      screen.getByRole("button", { name: /calculate interest/i })
    );

    // Wait for result
    await waitFor(() => {
      expect(screen.getByText(/calculation summary/i)).toBeInTheDocument();
    });

    // Simple Interest: A = P(1 + rt) = 10000(1 + 0.02 * 12) = 10000(1.24) = 12400
    expect(screen.getByText(/₹12,400.00/)).toBeInTheDocument();
  });

  test("shows validation errors for invalid inputs", async () => {
    render(<App />);

    // Try to enter negative amount
    const amountInput = screen.getByLabelText(/principal amount/i);
    fireEvent.change(amountInput, { target: { value: "-1000" } });
    fireEvent.blur(amountInput);

    await waitFor(() => {
      expect(
        screen.getByText(/amount must be greater than 0/i)
      ).toBeInTheDocument();
    });
  });

  test("resets form when reset button is clicked", () => {
    render(<App />);

    // Fill in some values
    fireEvent.change(screen.getByLabelText(/principal amount/i), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByLabelText(/monthly interest rate/i), {
      target: { value: "1.5" },
    });

    // Reset
    fireEvent.click(screen.getByRole("button", { name: /reset all/i }));

    // Check values are reset
    expect(screen.getByLabelText(/principal amount/i)).toHaveValue(0);
    expect(screen.getByLabelText(/monthly interest rate/i)).toHaveValue(0);
  });

  test("disables calculate button when form is invalid", () => {
    render(<App />);

    const calculateButton = screen.getByRole("button", {
      name: /calculate interest/i,
    });

    // Button should be disabled initially (empty form)
    expect(calculateButton).toBeDisabled();

    // Fill in valid values
    fireEvent.change(screen.getByLabelText(/principal amount/i), {
      target: { value: "10000" },
    });
    fireEvent.change(screen.getByLabelText(/monthly interest rate/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/time period/i), {
      target: { value: "12" },
    });

    // Button should be enabled now
    expect(calculateButton).not.toBeDisabled();
  });
});
