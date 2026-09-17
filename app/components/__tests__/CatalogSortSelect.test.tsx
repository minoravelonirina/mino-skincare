import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatalogSortSelect from "@/app/components/CatalogSortSelect";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/fr/catalogue",
}));

const labels = {
  default: "Pertinence",
  priceAsc: "Prix croissant",
  priceDesc: "Prix décroissant",
  newest: "Nouveautés",
  popular: "Populaire",
};

describe("CatalogSortSelect", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders the select with localized options", () => {
    render(<CatalogSortSelect value="relevance" labels={labels} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("relevance");
    expect(screen.getAllByRole("option")).toHaveLength(5);
    const optionNames = screen.getAllByRole("option").map((option) => option.textContent);
    expect(optionNames).toEqual(Object.values(labels));
  });

  it("pushes the sort param when a non-default option is chosen", async () => {
    const user = userEvent.setup();
    render(<CatalogSortSelect value="relevance" labels={labels} />);

    await user.selectOptions(screen.getByRole("combobox"), "price_asc");

    expect(pushMock).toHaveBeenCalledWith("/fr/catalogue?sort=price_asc");
  });

  it("drops the sort param when relevance is chosen", async () => {
    const user = userEvent.setup();
    render(<CatalogSortSelect value="price_desc" labels={labels} />);

    await user.selectOptions(screen.getByRole("combobox"), "relevance");

    expect(pushMock).toHaveBeenCalledWith("/fr/catalogue");
  });

  it("preserves the active search and category when sorting", async () => {
    const user = userEvent.setup();
    render(
      <CatalogSortSelect value="relevance" search="shampoo" category="soins" labels={labels} />
    );

    await user.selectOptions(screen.getByRole("combobox"), "newest");

    expect(pushMock).toHaveBeenCalledWith("/fr/catalogue?search=shampoo&category=soins&sort=newest");
  });

  it("falls back to relevance for unknown values", () => {
    render(<CatalogSortSelect value="bogus" labels={labels} />);

    expect(screen.getByRole("combobox")).toHaveValue("relevance");
  });
});