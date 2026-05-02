import nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";
import { ratelimit } from "../../lib/ratelimit";
import { getGeoData } from "../../lib/geoip";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function validateFields(data: Record<string, unknown>): string | null {
  const { name, email, subject, message } = data;
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100)
    return "Name must be between 2 and 100 characters.";
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Invalid email address.";
  if (typeof subject !== "string" || subject.trim().length < 3 || subject.length > 150)
    return "Subject must be between 3 and 150 characters.";
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 5000)
    return "Message must be between 10 and 5000 characters.";
  return null;
}

export async function POST(req: NextRequest) {
  // ── Rate limit ──────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const { success } = ratelimit(ip);
  if (!success) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  // ── Parse body ──────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Honeypot ────────────────────────────────────────────────
  if (typeof body.honeypot === "string" && body.honeypot.length > 0) {
    return Response.json({ success: true });
  }

  // ── Validate ────────────────────────────────────────────────
  const validationError = validateFields(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 422 });
  }

  const name = (body.name as string).trim();
  const email = (body.email as string).trim();
  const subject = (body.subject as string).trim();
  const message = (body.message as string).trim();

  // ── Collect passive data ────────────────────────────────────
  const userAgent = req.headers.get("user-agent") ?? "";
  const ua = new UAParser(userAgent).getResult();
  const geo = await getGeoData(ip);

  const deviceType =
    ua.device.type === "mobile" ? "mobile"
      : ua.device.type === "tablet" ? "tablet"
        : "desktop";

  // ── Send email ──────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">

        <h2 style="color: #333;">New Contact — TechSolve</h2>

        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Subject</td><td>${escapeHtml(subject)}</td></tr>
        </table>

        <h3 style="color: #333; margin-top: 24px;">Message</h3>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 6px;">
          ${escapeHtml(message).replace(/\n/g, "<br/>")}
        </p>

        <h3 style="color: #333; margin-top: 24px;">Sender Info</h3>
        <table style="width:100%; border-collapse: collapse; background: #f9f9f9; border-radius: 6px;">
          <tr><td style="padding: 8px; font-weight: bold;">IP</td><td>${ip}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Country</td><td>${geo?.country ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">City</td><td>${geo?.city ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Region</td><td>${geo?.region ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">ISP</td><td>${geo?.isp ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Timezone</td><td>${geo?.timezone ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Coordinates</td><td>${geo?.latitude ?? "?"}, ${geo?.longitude ?? "?"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Browser</td><td>${ua.browser.name ?? "?"} ${ua.browser.version ?? ""}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">OS</td><td>${ua.os.name ?? "?"} ${ua.os.version ?? ""}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Device</td><td>${deviceType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Language</td><td>${req.headers.get("accept-language")?.split(",")[0] ?? "Unknown"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Referrer</td><td>${req.headers.get("referer") ?? "Direct"}</td></tr>
        </table>

      </div>
    `;

    await transporter.sendMail({
      from: `"TechSolve Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[TechSolve] ${subject.replace(/[\r\n]/g, "")}`,
      replyTo: email,
      html,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact] mail error:", err);
    return Response.json({ error: "Failed to send. Try again later." }, { status: 500 });
  }
}