// @vitest-environment node
import { describe, it, expect } from "vitest";
import { SignJWT } from "jose";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth";

const user = { userId: 13, email: "client@test.com", role: "CUSTOMER" as const };

describe("auth tokens", () => {
  it("signs and verifies an access token", async () => {
    const token = await generateAccessToken(user);
    const payload = await verifyAccessToken(token);

    expect(payload).toMatchObject({ userId: 13, email: "client@test.com", role: "CUSTOMER" });
  });

  it("issues distinct access and refresh tokens, each verifiable by its own key", async () => {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    expect(accessToken).not.toBe(refreshToken);
    expect(await verifyRefreshToken(refreshToken)).toMatchObject({ userId: 13 });
    expect(await verifyRefreshToken(accessToken)).toBeNull();
  });

  it("sets a future expiration claim", async () => {
    const payload = await verifyAccessToken(await generateAccessToken(user));

    expect(payload).not.toBeNull();
    expect(payload!.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("returns null for malformed tokens", async () => {
    expect(await verifyAccessToken("not-a-jwt")).toBeNull();
    expect(await verifyRefreshToken("a.b.c")).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const forged = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode("wrong-secret"));

    expect(await verifyAccessToken(forged)).toBeNull();
  });
});