import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  projectType: z.enum(["website", "platform", "backend", "data", "other"]),
  budget: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(3000),
  website: z.string().max(0).optional().default(""),
});

const rateWindowMs = 60 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
// This in-memory limit is per serverless instance and is not shared across instances.
const submissionsByIp = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string, now: number) {
  const recentSubmissions = (submissionsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < rateWindowMs);
  if (recentSubmissions.length >= maxSubmissionsPerWindow) {
    submissionsByIp.set(ip, recentSubmissions);
    return true;
  }
  recentSubmissions.push(now);
  submissionsByIp.set(ip, recentSubmissions);

  if (submissionsByIp.size > 5000) {
    for (const [storedIp, timestamps] of submissionsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= rateWindowMs)) submissionsByIp.delete(storedIp);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  if (isRateLimited(ip, now)) {
    return Response.json({ message: "Too many submissions. Please try again later or email me directly." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "The submitted form data is invalid." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ message: "Please check the form fields and try again." }, { status: 400 });
  }
  if (parsed.data.website) {
    return Response.json({ message: "The form could not be submitted. Please email me directly." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO;
  if (!apiKey || !contactTo) {
    return Response.json({
      message: "Email delivery is not configured yet. Please contact me directly at yusuphsaalim@gmail.com.",
    }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || "onboarding@resend.dev",
    to: contactTo,
    replyTo: parsed.data.email,
    subject: `Portfolio inquiry: ${parsed.data.projectType}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Project type: ${parsed.data.projectType}`,
      `Budget: ${parsed.data.budget || "Not provided"}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Contact email delivery failed", error);
    return Response.json({ message: "Email delivery failed. Please email me directly at yusuphsaalim@gmail.com." }, { status: 502 });
  }
  if (!data?.id) {
    console.error("Contact email delivery returned no message identifier");
    return Response.json({ message: "Email delivery could not be confirmed. Please email me directly." }, { status: 502 });
  }

  return Response.json({ message: "Thank you! Your message has been sent." });
}
