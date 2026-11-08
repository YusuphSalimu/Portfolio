import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  projectType: z.enum(["Website", "Web platform", "Backend / SaaS", "Data / ML", "Other"]),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(3000),
  website: z.string().trim().optional().or(z.literal("")),
});

const rateLimit = new Map<string, number[]>();

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "local";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const history = rateLimit.get(ip) ?? [];
  const recent = history.filter((timestamp) => now - timestamp < 60 * 60 * 1000);

  if (recent.length >= 5) {
    return true;
  }

  rateLimit.set(ip, [...recent, now]);
  return false;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = formSchema.parse(json);

    if (payload.website) {
      return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
    }

    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again in an hour." },
        { status: 429 },
      );
    }

    const { RESEND_API_KEY, CONTACT_TO } = process.env;

    if (RESEND_API_KEY && CONTACT_TO) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      const email = await resend.emails.send({
        from: "Yusuph Salimu Portfolio <noreply@resend.dev>",
        to: [CONTACT_TO],
        replyTo: payload.email,
        subject: `Portfolio inquiry: ${payload.projectType}`,
        html: `
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Project type:</strong> ${payload.projectType}</p>
          ${payload.budget ? `<p><strong>Budget:</strong> ${payload.budget}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${payload.message.replace(/\n/g, "<br />")}</p>
        `,
      });

      if (email.error) {
        return NextResponse.json(
          { success: false, error: "Email delivery failed. Please contact yusuphsaalim@gmail.com directly." },
          { status: 500 },
        );
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Email sending is not configured. Please email yusuphsaalim@gmail.com directly.",
      },
      { status: 400 },
    );
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid form data." : "Invalid form data.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
