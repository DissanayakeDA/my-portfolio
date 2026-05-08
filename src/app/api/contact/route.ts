import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeValue = (value: string) => value.replace(/\s+/g, " ").trim();

const normalizePayload = (payload: ContactPayload): ContactPayload => ({
  name: normalizeValue(payload.name),
  email: normalizeValue(payload.email),
  subject: normalizeValue(payload.subject),
  message: payload.message.trim(),
});

const isValidPayload = (payload: ContactPayload) => {
  if (!payload.name || payload.name.length > 100) return false;
  if (!EMAIL_PATTERN.test(payload.email) || payload.email.length > 254)
    return false;
  if (!payload.subject || payload.subject.length > 150) return false;
  if (!payload.message || payload.message.length > 5000) return false;
  return true;
};

const isContactPayload = (value: unknown): value is ContactPayload => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.subject === "string" &&
    typeof payload.message === "string"
  );
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { message: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!isContactPayload(payload)) {
    return NextResponse.json(
      { message: "Please provide a valid contact form payload." },
      { status: 400 }
    );
  }

  const normalizedPayload = normalizePayload(payload);
  if (!isValidPayload(normalizedPayload)) {
    return NextResponse.json(
      { message: "Please check your form details and try again." },
      { status: 400 }
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] ${normalizedPayload.subject}`,
      reply_to: normalizedPayload.email,
      text: `Name: ${normalizedPayload.name}
Email: ${normalizedPayload.email}

Message:
${normalizedPayload.message}`,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error("Failed to send contact email", resendError);

    return NextResponse.json(
      { message: "Could not send your message right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Thanks! Your message has been sent." });
}
