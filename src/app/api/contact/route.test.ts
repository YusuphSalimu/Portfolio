import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));

const payload = { name: "Visitor", email: "visitor@example.com", projectType: "website", message: "A website inquiry" };
let POST: typeof import("./route").POST;
async function submit(body: unknown = payload) {
  return POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
}

beforeEach(async () => {
  vi.resetModules();
  send.mockReset();
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_TO", "");
  vi.stubEnv("CONTACT_FROM", "Portfolio <hello@example.com>");
  vi.spyOn(console, "error").mockImplementation(() => {});
  ({ POST } = await import("./route"));
}, 30_000);
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("contact delivery", () => {
  it("uses the owner's inbox when only the Resend key and sender are configured", async () => {
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    expect((await submit()).status).toBe(200);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: "yusuphsaalim@gmail.com", from: "Portfolio <hello@example.com>", replyTo: "visitor@example.com" }));
  });
  it("honors and trims configured addresses", async () => {
    vi.stubEnv("CONTACT_TO", " owner@example.com ");
    vi.stubEnv("CONTACT_FROM", " hello@example.com ");
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    expect((await submit()).status).toBe(200);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: "owner@example.com", from: "hello@example.com" }));
  });
  it("reports missing credentials without calling Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", " ");
    const response = await submit();
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("EMAIL_NOT_CONFIGURED");
    expect(send).not.toHaveBeenCalled();
  });
  it("rejects invalid configured recipients", async () => {
    vi.stubEnv("CONTACT_TO", "not-an-email");
    expect((await submit()).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
  });
  it("identifies the restricted test sender without exposing provider details to visitors", async () => {
    send.mockResolvedValue({ data: null, error: { name: "validation_error", statusCode: 403, message: "You can only send testing emails to your own email address (private@example.com)." } });
    const response = await submit();
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("private@example.com");
    expect(console.error).toHaveBeenCalledWith("Contact email delivery failed", expect.objectContaining({ reason: "test_sender_recipient_restricted" }));
  });
  it("handles provider exceptions as JSON instead of crashing the route", async () => {
    send.mockRejectedValue(new Error("Network unavailable"));
    const response = await submit();
    expect(response.status).toBe(502);
    expect((await response.json()).code).toBe("EMAIL_PROVIDER_UNAVAILABLE");
  });
  it("does not claim success when Resend returns no message ID", async () => {
    send.mockResolvedValue({ data: null, error: null });
    expect((await submit()).status).toBe(502);
  });
  it("rejects bot and invalid input before calling the provider", async () => {
    expect((await submit({ ...payload, website: "https://spam.example" })).status).toBe(400);
    expect((await submit({ ...payload, email: "invalid" })).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
});
