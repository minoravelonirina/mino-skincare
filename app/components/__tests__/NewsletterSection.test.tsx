import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterSection from "@/app/components/home/NewsletterSection";

const content = {
  title: "Stay in the loop",
  submit: "Subscribe",
  placeholder: "Email address",
  success: "Thanks!",
  error: "Invalid email",
};

describe("NewsletterSection", () => {
  it("renders the form with localized strings", () => {
    render(<NewsletterSection content={content} />);

    expect(screen.getByText("Stay in the loop")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("shows the localized error message for an invalid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection content={content} />);

    await user.type(screen.getByPlaceholderText("Email address"), "not-an-email");
    fireEvent.submit(document.querySelector("form")!);

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.queryByText("Thanks!")).not.toBeInTheDocument();
  });

  it("shows success and hides the form for a valid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterSection content={content} />);

    await user.type(screen.getByPlaceholderText("Email address"), "client@test.com");
    fireEvent.submit(document.querySelector("form")!);

    expect(screen.getByText("Thanks!")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Email address")).not.toBeInTheDocument();
  });

  it("falls back to defaults when content keys are missing", () => {
    render(<NewsletterSection content={{}} />);

    expect(screen.getByText("Stay connected")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
  });
});