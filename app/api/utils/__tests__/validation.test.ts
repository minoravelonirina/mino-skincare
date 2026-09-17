import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { ApiError } from "@/app/api/utils/responses";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  parsePositiveInt,
  getPaginationParams,
  getProductFilters,
} from "@/app/api/utils/validation";

describe("validateEmail", () => {
  it("accepts well-formed emails", () => {
    expect(validateEmail("client@test.com")).toBe(true);
    expect(validateEmail("a.b+c@sub.domain.io")).toBe(true);
  });

  it("rejects malformed emails", () => {
    expect(validateEmail("plainaddress")).toBe(false);
    expect(validateEmail("@x.com")).toBe(false);
    expect(validateEmail("a@b")).toBe(false);
    expect(validateEmail("a b@c.com")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("requires at least 6 characters", () => {
    expect(validatePassword("12345")).toBe(false);
    expect(validatePassword("123456")).toBe(true);
  });
});

describe("validateRequired", () => {
  it("throws a 400 ApiError for empty values", () => {
    for (const value of [undefined, null, "", "   ", 0]) {
      expect(() => validateRequired(value, "chanp")).toThrowError(ApiError);
    }
  });

  it("accepts non-empty values", () => {
    expect(() => validateRequired("text", "field")).not.toThrow();
    expect(() => validateRequired(true, "field")).not.toThrow();
  });
});

describe("parsePositiveInt", () => {
  it("parses positive integers", () => {
    expect(parsePositiveInt("3")).toBe(3);
  });

  it("rejects missing, zero, negative and non-integer values", () => {
    expect(parsePositiveInt(undefined)).toBeNull();
    expect(parsePositiveInt(null)).toBeNull();
    expect(parsePositiveInt("")).toBeNull();
    expect(parsePositiveInt("0")).toBeNull();
    expect(parsePositiveInt("-4")).toBeNull();
    expect(parsePositiveInt("3.5")).toBeNull();
    expect(parsePositiveInt("abc")).toBeNull();
  });
});

describe("getPaginationParams", () => {
  it("defaults to page 1 / limit 20", () => {
    const request = new NextRequest("http://localhost/api/products");
    expect(getPaginationParams(request)).toEqual({ page: 1, limit: 20 });
  });

  it("clamps page to >= 1 and limit to <= 100", () => {
    const request = new NextRequest("http://localhost/api/products?page=0&limit=999");
    expect(getPaginationParams(request)).toEqual({ page: 1, limit: 100 });
  });

  it("parses provided values", () => {
    const request = new NextRequest("http://localhost/api/products?page=2&limit=50");
    expect(getPaginationParams(request)).toEqual({ page: 2, limit: 50 });
  });
});

describe("getProductFilters", () => {
  it("parses and coerces query parameters", () => {
    const request = new NextRequest(
      "http://localhost/api/products?page=3&limit=10&categoryId=15&brandId=2&search=shampoo&skinType=all&minPrice=5&maxPrice=20&featured=true&onSale=false&sort=price_asc"
    );
    expect(getProductFilters(request)).toMatchObject({
      page: 3,
      limit: 10,
      categoryId: 15,
      brandId: 2,
      search: "shampoo",
      skinType: "all",
      minPrice: 5,
      maxPrice: 20,
      featured: true,
      onSale: false,
      sort: "price_asc",
    });
  });
});